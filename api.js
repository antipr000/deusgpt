import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api"
});

instance.interceptors.request.use((config) => {
    return config;
});

async function createUser(idToken) {
    const { data } = await instance.post('/user', { idToken });
    return data;
}

async function register(email, password, firstName, lastName) {
    const { data } = await instance.post('/register', { email, password, firstName, lastName });
    return data;
}

export { createUser, register };