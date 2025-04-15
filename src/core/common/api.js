import axiosInstance from "../../utils/axiosInstance.js";

export const postApi = async (route,data)=>{
    try {
        const response = await axiosInstance.post(route, data);
        return response;
    } catch (error) {
        console.error('Error posting data', error);
        throw error;
    }
}

export const getApi = async(route)=>{
    try{
        const response = await axiosInstance.get(route, data);
        return response;
    }catch (error){
        console.error('Error posting data', error);
        throw error;
    }
}

export const putApi = async(route,data)=>{
    try {
        const response = await axiosInstance.put(route, data);
        return response;
    } catch (error) {
        console.error('Error posting data', error);
        throw error;
    }
}

export const deleteApi = async(route,data)=>{
    try {
        const response = await axiosInstance.delete(route, data);
        return response;
    } catch (error) {
        console.error('Error posting data', error);
        throw error;
    }
}