export const api = "http://localhost:8080";

export const requestConfig = (method, data = null) => {
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', // Adiciona cabeçalho Accept
        },
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    return config;
};
