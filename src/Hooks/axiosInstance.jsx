import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://sharebite-server-site.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;