import axios from "axios";

const API_URL = "http://localhost:8080/bienen/user/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};
const login = (emailId, password) => {
    return axios
        .post(API_URL + "login", {
            emailId,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};
const logout = () => {
    localStorage.removeItem("user");
};
export default {
    register,
    login,
    logout,
};