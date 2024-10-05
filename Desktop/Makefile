# Nome do executável
TARGET = keyboard_server

# Compilador
CC = gcc

# Flags de compilação
CFLAGS = -Wall -Wextra

# Bibliotecas necessárias
LIBS = -lmicrohttpd -lX11 -lXtst

# Arquivo fonte
SRC = main.c

# Gera o executável
$(TARGET): $(SRC)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRC) $(LIBS)

# Limpa arquivos gerados (executável e logs)
clean:
	rm -f $(TARGET) logs.txt

# Remove apenas o executável
clean_exec:
	rm -f $(TARGET)

# Remove apenas o arquivo de log
clean_logs:
	rm -f logs.txt
