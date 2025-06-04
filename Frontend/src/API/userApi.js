import api from './apiConfig';

export const userSignup = async (data) => {
    const response = await api.post('/user/signup', data);
    return response;
}

export const userLogin = async (data) => {
    const response = await api.post('/user/login', data);
    return response;
}

