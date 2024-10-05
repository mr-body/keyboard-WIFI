from flask import Flask, request, jsonify
import pyautogui
import logging
import datetime
import sys

# Configurações de log
LOG_FILE = 'logs.txt'
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, 
                    format='%(asctime)s [%(levelname)s] %(message)s')

app = Flask(__name__)

# Função para logar a entrada
def log_value(ip, port, value, success):
    status = "SUCCESS" if success else "ERROR"
    logging.info(f"[{ip}:{port}][{value}] -> {status}")
    print(f"[{ip}:{port}] [{datetime.datetime.now()}] [{value}] -> {status}")

# Função para digitar caracteres, incluindo especiais
def type_key(key):
    try:
        # Trata caracteres especiais
        if key == 'space':
            pyautogui.press('space')
        elif key == 'enter':
            pyautogui.press('enter')
        elif key == 'backspace':
            pyautogui.press('backspace')
        elif key == 'delete':
            pyautogui.press('delete')
        elif key == 'capslock':
            pyautogui.press('capslock')
        elif key == 'capslock':
            pyautogui.press('capslock')
        elif key == 'Tab':
            pyautogui.press('tab')
        else:
            # Para outros caracteres, usa write
            pyautogui.write(key)
    except Exception as e:
        print(f"Erro ao digitar a tecla {key}: {e}")

# Rota para processar requisições de teclado
@app.route('/api/keyboard/<path:key_sequence>', methods=['GET'])
def handle_key(key_sequence):
    ip = request.remote_addr
    port = request.environ.get('SERVER_PORT')  # Obtém a porta do servidor
    success = True

    try:
        # Itera sobre cada caractere na sequência
        # for char in key_sequence:
        type_key(key_sequence)  # Digita o caractere
    except Exception as e:
        success = False
        print(f"Erro ao processar a sequência de teclas: {e}")

    log_value(ip, port, key_sequence, success)
    return jsonify({"status": "Typed"}), 200 if success else 500

if __name__ == '__main__':
    # Verifica se a porta foi fornecida como argumento
    port = 1933  # Porta padrão
    if len(sys.argv) == 3 and sys.argv[1] == '-p':
        try:
            port = int(sys.argv[2])
        except ValueError:
            print("Por favor, forneça um número válido para a porta.")
            sys.exit(1)
    elif len(sys.argv) > 1:
        print("Uso: python script.py -p <porta>")
        sys.exit(1)

    app.run(host='0.0.0.0', port=port)
