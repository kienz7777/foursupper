import axiosClient from "./axiosClient";

const userApi = {
    getAll: () => {
        const url = '/user/getAll';
        return axiosClient.get(url);
    },
    post: data => {
        const url = '/user/login';
        return axiosClient.post(url, data);
    }
}

export default userApi;