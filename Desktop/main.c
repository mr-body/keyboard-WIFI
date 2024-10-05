#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <microhttpd.h>
#include <X11/Xlib.h>
#include <X11/keysym.h>
#include <X11/extensions/XTest.h> // Incluir Xtst.h para XTestFakeKeyEvent
#include <time.h> // Biblioteca para obter data e hora
#include <arpa/inet.h> // Biblioteca para trabalhar com IP
#include <ifaddrs.h> // Para obter o IP da máquina local

#define DEFAULT_PORT 1933
#define LOG_FILE "logs.txt"

// Códigos ANSI para cores
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_RESET   "\x1b[0m"

// Função para obter o horário atual em formato string
void get_current_time(char *buffer, size_t buffer_size) {
    time_t t = time(NULL);
    struct tm *tm_info = localtime(&t);
    strftime(buffer, buffer_size, "%Y-%m-%d %H:%M:%S", tm_info);
}

// Função para obter o IP local da máquina
void get_local_ip(char *ip_buffer) {
    struct ifaddrs *ifaddr, *ifa;
    getifaddrs(&ifaddr);

    for (ifa = ifaddr; ifa != NULL; ifa = ifa->ifa_next) {
        if (ifa->ifa_addr == NULL) continue;

        if (ifa->ifa_addr->sa_family == AF_INET) {
            struct sockaddr_in *addr = (struct sockaddr_in *)ifa->ifa_addr;
            inet_ntop(AF_INET, &addr->sin_addr, ip_buffer, INET_ADDRSTRLEN);
            if (strcmp(ifa->ifa_name, "lo") != 0) break;  // Evita pegar o IP "localhost"
        }
    }
    freeifaddrs(ifaddr);
}

// Função para logar no terminal e no arquivo
void log_value(const char *ip, const char *value, int success) {
    FILE *file = fopen(LOG_FILE, "a");
    char time_str[20];
    get_current_time(time_str, sizeof(time_str));

    const char *status = success ? "SUCCESS" : "ERROR";
    const char *color_status = success ? ANSI_COLOR_GREEN : ANSI_COLOR_RED;

    // Formato do log: [IP][DATA HORA][TECLAS] -> SUCCESS || ERROR
    if (file != NULL) {
        fprintf(file, "[%s][%s][%s] -> %s\n", ip, time_str, value, status);
        fclose(file);
    }
    // Exibe o log no terminal com coloração
    printf(ANSI_COLOR_BLUE "[%s]" ANSI_COLOR_YELLOW "[%s]" ANSI_COLOR_RESET "[%s] -> %s%s%s\n",
           ip, time_str, value, color_status, status, ANSI_COLOR_RESET);
}

// Função para simular uma tecla com X11
void type_key(Display *display, KeySym keysym) {
    KeyCode keycode = XKeysymToKeycode(display, keysym);
    if (keycode == 0) return;

    XTestFakeKeyEvent(display, keycode, True, 0);  // Função definida em Xtst.h
    XTestFakeKeyEvent(display, keycode, False, 0);
    XFlush(display);
}

// Função para processar as teclas especiais e digitação
int handle_key(const char *arg) {
    Display *display = XOpenDisplay(NULL);
    if (display == NULL) {
        printf("Erro ao abrir o display.\n");
        return 0; // Retorna 0 em caso de erro
    }

    if (strcmp(arg, "enter") == 0) {
        type_key(display, XK_Return);
    } else if (strcmp(arg, "CapsLock") == 0) {
        type_key(display, XK_Caps_Lock);
    } else if (strcmp(arg, "Tab") == 0) {
        type_key(display, XK_Tab);
    } else if (strcmp(arg, "backspace") == 0) {
        type_key(display, XK_BackSpace);
    } else if (strcmp(arg, "space") == 0) {
        type_key(display, XK_space);
    } else {
        // Digitar o texto como caracteres
        for (size_t i = 0; i < strlen(arg); i++) {
            type_key(display, XStringToKeysym(&arg[i]));
        }
    }

    XCloseDisplay(display);
    return 1; // Retorna 1 em caso de sucesso
}

// Função de callback para responder requisições HTTP
static enum MHD_Result answer_to_connection(void *cls, struct MHD_Connection *connection,
                                const char *url, const char *method, const char *version,
                                const char *upload_data, size_t *upload_data_size, void **con_cls) {
    const char *page = "<html><body>Log registrado.</body></html>";
    struct MHD_Response *response;
    int ret;

    // Obtém o endereço IP do cliente
    struct sockaddr_in *client_addr = (struct sockaddr_in *)MHD_get_connection_info(connection, MHD_CONNECTION_INFO_CLIENT_ADDRESS)->client_addr;
    char client_ip[INET_ADDRSTRLEN];
    inet_ntop(AF_INET, &(client_addr->sin_addr), client_ip, INET_ADDRSTRLEN);

    // Verifica se é uma requisição GET para o endpoint certo
    if (strncmp(url, "/api/keyboard/", 14) == 0 && strcmp(method, "GET") == 0) {
        const char *arg = url + 14; // Obtém o argumento após "/api/keyboard/"
        int success = handle_key(arg); // Processa o input e verifica sucesso
        log_value(client_ip, arg, success);

        response = MHD_create_response_from_buffer(strlen(page), (void *)page, MHD_RESPMEM_PERSISTENT);
        ret = MHD_queue_response(connection, MHD_HTTP_OK, response);
        MHD_destroy_response(response);
        return ret;
    }

    return MHD_NO;
}

int main(int argc, char *argv[]) {
    int port = DEFAULT_PORT; // Porta padrão
    struct MHD_Daemon *daemon;
    char local_ip[INET_ADDRSTRLEN] = "Desconhecido";

    // Verifica argumentos de linha de comando para porta
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-p") == 0 && i + 1 < argc) {
            port = atoi(argv[i + 1]); // Define a porta
            break;
        }
    }

    // Obtém o IP local da máquina
    get_local_ip(local_ip);

    // Inicia o daemon HTTP
    daemon = MHD_start_daemon(MHD_USE_SELECT_INTERNALLY, port, NULL, NULL, 
                              &answer_to_connection, NULL, MHD_OPTION_END);
    if (daemon == NULL) {
        return 1;
    }

    // Exibe informações de IP e porta
    printf(ANSI_COLOR_YELLOW "====================================\n" ANSI_COLOR_RESET);
    printf(ANSI_COLOR_BLUE "IP: %s\n" ANSI_COLOR_RESET, local_ip);
    printf(ANSI_COLOR_YELLOW "====================================\n" ANSI_COLOR_RESET);
    printf(ANSI_COLOR_BLUE "Porta: %d\n" ANSI_COLOR_RESET, port);
    printf(ANSI_COLOR_YELLOW "====================================\n" ANSI_COLOR_RESET);

    getchar(); // Aguarda input para finalizar o programa

    MHD_stop_daemon(daemon);
    return 0;
}
