import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://localhost:7006/";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers!!["Content-Type"] = "application/json";
    const userId = localStorage.getItem("userId");
    if (userId) {
        config.headers!!["userId"] = userId;
    }
    const token = localStorage.getItem("userToken");
    if (token) {
        config.headers!!["Authorization"] = "Bearer " + token;
    }

    return config;
});

axios.interceptors.response.use(
    function (response: any) {
        // Do something with response data
        return response;
    },
    function (error: AxiosError) {
        //@ts-ignore
        toast.error(error.response?.data as any);
        return Promise.reject(error.response);
    }
);

type Method = "get" | "put" | "post" | "delete" | "patch";

const axiosHelper: {
    [key in Method]: <T = any, U = any>(url: string, data?: U, headers?: any) => Promise<AxiosResponse<T, U>>;
} = {
    get: (url, data?) => {
        return axios({
            method: "get",
            url,
            params: data,
        });
    },
    post: (url, data?) => {
        return axios({
            method: "post",
            url,
            data,
        });
    },
    put: (url, data?) => {
        return axios({
            method: "put",
            url,
            data,
        });
    },
    delete: (url, data?) => {
        return axios({
            method: "delete",
            url,
            data,
        });
    },
    patch: (url, data?) => {
        return axios({
            method: "patch",
            url,
            data,
        });
    },
};

export default axiosHelper;
