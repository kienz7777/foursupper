import axiosClient from "./axiosClient";

const userApi = {
    post: data => {
        const url = '/user/login';
        return axiosClient.post(url, data)
                        .then(res => res)
                        .catch(err => err);
    }
}

export default userApi;