//faz requisição http e autentica o usuário

import{api, requestConfig} from "../utils/config.jsx";


const logout = () => {
    localStorage.removeItem("token");
};

const login = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "users/login", config)
            .then((res) => res.json())
            .catch((err )=> err);

        if(res) {
            localStorage.setItem("token", JSON.stringify(res));
        }
        return res;
    } catch (error) {
        console.log(error);
    }
};

const authService = {
    logout,
    login,
};

export default authService;

