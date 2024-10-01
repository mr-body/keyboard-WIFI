// function.ts
const waalexan = () => {
    const extractTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

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

    return { extractTime, formatDate }; // Retornando as funções
}

export default waalexan;