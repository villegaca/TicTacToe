//import axios from 'axios';
import axiosInstance from './AxiosConfig';

const API_URL = 'http://localhost:8080';

export const loginCall = async (loginData) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/attemptLogin`, loginData);
        return response.data;
    } catch (error) {
        console.error("Error during login", error);
        throw error;
    }
}

export const signupCall = async (formData) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/signup`, formData);
        return response.data;
    } catch (error) {
        console.error("Error during signing in", error);
        throw error;
    }
}

export const getWinLossCall = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/getStats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stats", error);
        throw error;
    }
}

export const postWinCall = async () => {
    try {
        const response = await axiosInstance.post(`${API_URL}/addWin`);
        return response.data;
    } catch (error) {
        console.error("Error posting win", error);
        throw error;
    }

}

export const postLossCall = async () => {
    try {
        const response = await axiosInstance.post(`${API_URL}/addLoss`);
        return response.data;
    } catch (error) {
        console.error("error posting loss", error);
        throw error;
    }
}

export const verifyPasswordCall = async (password) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/verifyPassword`, {password});
        return response.data;
    } catch (error) {
        console.error("error verifying password", error);
        throw error;
    }
}

export const changeUsernameCall = async (username) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/changeUsername`, {username});
        return response;
    } catch (error) {
       console.error("Error changing username", error);
       throw error; 
    }
}

export const deleteAccountCall = async (password) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/delete`, {data: {password}});    
        return response.data;
    } catch (error) {
        console.error("Error deleting account", error);
        throw error;
    }
}

// export const calculateMoveCall = async ({board}) => {
//     try {
//         const response = await axios.post(`${API_URL}/calculateMove`, {board} );
//         return response.data;
//     } catch (error) {
//         console.error("error calculating move", error);
//         throw error;
//     }
// }

export const changePasswordCall = async (password) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/changePassword`, { password });
        return response.data;
    } catch (error) {
        console.error("Error changing password", error);
        throw error;
    }

}