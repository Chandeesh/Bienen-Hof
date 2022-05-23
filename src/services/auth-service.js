import axios from "axios";

const API_URL = "http://localhost:8080/bienen/user/";

const register = (userName, emailId, password) => {
    return axios.post(API_URL + "register", {
        userName,
        emailId,
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
const activate = (activationToken) => {
    return axios
        .put(API_URL + "confirm",  {}, { params: { token: activationToken } })
};
const logout = () => {
    localStorage.removeItem("user");
};
export default {
    register,
    login,
    logout,
    activate
};