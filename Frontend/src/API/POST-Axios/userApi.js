import api from './apiConfig';

export const userSignup = async (data) => {
    const response = await api.post('/user/signup', data);
    return response;
}

export const userLogin = async (data) => {
    const response = await api.post('/user/login', data);
    return response;
}


export const updateUserData = async (data)=>{
try {
    const response = await api.post('/user/update-user', data);
    return response;
} catch (error) {
    console.log(error);
    throw error;
}
}


export const updateProfile = async (image)=>{

    try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await api.post('/user/update-user-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Generate OTP
export const generateOTP = async (name, email)=>{
    try {
        const response = await api.post('/user/generate-otp', {name, email}); 
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}