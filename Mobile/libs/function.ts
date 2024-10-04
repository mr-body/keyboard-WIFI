const waalexan = () => {
    // Função para extrair o horário de uma string de data
    const extractTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    // Função para formatar a data com base no tempo decorrido
    const formatDate = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) {
            return `Agora`;
        } else if (diffInMinutes < 60) {
            return `Há ${diffInMinutes} minutos`;
        } else if (diffInHours < 24) {
            return `Há ${diffInHours} horas`;
        } else if (diffInDays === 1) {
            return `Ontem`;
        } else if (diffInDays === 2) {
            return `Anteontem`;
        } else if (diffInDays < 7) {
            return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date);
        } else {
            return new Intl.DateTimeFormat('pt-BR').format(date);
        }
    };

    // Função para formatar texto com delimitador
    const formatarTexto = (texto: string, numeroDeCaracteres: number, delimitador: string) => {
        let textoFormatado = '';
        
        for (let i = 0; i < texto.length; i += numeroDeCaracteres) {
            textoFormatado += texto.slice(i, i + numeroDeCaracteres) + delimitador;
        }
    
        // Remove o último delimitador extra no final
        return textoFormatado.trim();
    };

    // Função para limitar o texto com reticências
    const limitarTexto = (texto: string, limite: number) => {
        return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
    };

    // Função para exibir iniciais de um texto
    const exibirIniciais = (texto: string) => {
        const palavras = texto.split(' ');
        const primeiraLetraPrimeiroNome = palavras[0].charAt(0).toUpperCase();
        const ultimaPalavra = palavras[palavras.length - 1];
        const primeiraLetraUltimoNome = ultimaPalavra.charAt(0).toUpperCase();
        return primeiraLetraPrimeiroNome + primeiraLetraUltimoNome;
    };

    // Função para ocultar parte de um código (exibindo apenas os últimos dígitos)
    const hideCode = (code: string, length: number) => {
        const ultimosDigitos = code.slice(-length);
        return "*".repeat(code.length - ultimosDigitos.length) + ultimosDigitos;
    };

    // Função para copiar texto para a área de transferência
    const eventCopy = (text: string) => {
        const inputElement = document.createElement('input');
        inputElement.value = text;
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        document.body.removeChild(inputElement);
        console.log(`Texto copiado: ${text}`);
    };

    // Função para obter data e hora formatadas
    const dateTime = (format: string) => {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const dataHora = new Date();
        const diaSemana = diasSemana[dataHora.getDay()];
        const dia = String(dataHora.getDate()).padStart(2, '0');
        const mes = String(dataHora.getMonth() + 1).padStart(2, '0');
        const ano = dataHora.getFullYear();
        const hora = String(dataHora.getHours()).padStart(2, '0');
        const minuto = String(dataHora.getMinutes()).padStart(2, '0');
        const segundo = String(dataHora.getSeconds()).padStart(2, '0');
    
        return format
            .replace('dd', dia)
            .replace('mm', mes)
            .replace('yy', ano.toString().slice(-2))
            .replace('yyyy', String(ano))
            .replace('H', hora)
            .replace('M', minuto)
            .replace('S', segundo)
            .replace('F', diaSemana);
    };

    // Função para formatar valores como moeda
    const formatarMoeda = (valor: number, moeda: string = 'USD', exibirMoeda: boolean = true) => {
        if (isNaN(valor)) {
            throw new Error("O valor fornecido não é um número válido.");
        }

        const opcoes = {
            style: 'currency',
            currency: moeda,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };

        const valorFormatado = new Intl.NumberFormat('pt-BR', opcoes).format(valor);
        return exibirMoeda ? valorFormatado : valorFormatado.replace(/[^0-9.,]/g, '');
    };

    return {
        extractTime,
        formatDate,
        formatarTexto,
        limitarTexto,
        exibirIniciais,
        hideCode,
        eventCopy,
        dateTime,
        formatarMoeda
    };
};

export default waalexan;
