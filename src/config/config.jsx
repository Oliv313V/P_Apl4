export const api = "http://localhost:8080";

export const requestConfig = (method, data = null) => {
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',            
            'Accept': '*/*',    
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    return config;
};
