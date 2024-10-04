from flask import Flask, jsonify, render_template
from flask_cors import CORS
import pyautogui
import os

app = Flask(__name__)
CORS(app)

# Caminho para o arquivo de log
LOG_FILE = 'logs.txt'

# Função auxiliar para adicionar o log ao arquivo
def log_value(value):
    with open(LOG_FILE, 'a') as f:
        f.write(f'{value}\n')

# Rota para receber os valores via URL e digitar usando PyAutoGUI
@app.route('/api/keyboard/<string:arg>', methods=['GET'])
def type_text(arg):
    log_value(arg)  # Adiciona o texto ao log

    # Verifica se o argumento é uma tecla especial
    if arg == "enter":
        pyautogui.press('enter')
    elif arg == "CapsLock":
        pyautogui.press('capslock')
    elif arg == "Tab":
        pyautogui.press('tab')
    elif arg == "backspace":
        pyautogui.press('backspace')
    elif arg == "space":
        pyautogui.press('space')  # Pressiona a barra de espaço
    else:
        pyautogui.typewrite(arg)

    return jsonify({"status": "success", "message": f"Typed: {arg}"})

# Rota para visualizar os logs
@app.route('/')
def view_logs():
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, 'r') as f:
            logs = f.readlines()
    else:
        logs = []

    return render_template('logs.html', logs=logs)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=1933)
