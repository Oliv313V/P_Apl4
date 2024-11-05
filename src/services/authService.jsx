import baseURL from "../config/configUrl.jsx"

const logout = () => {
    localStorage.removeItem("token");
};

const login = async (data) => {
    try {
        const res = await baseURL.post('users/login', data)
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

