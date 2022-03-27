import axiosClient from "./axiosClient";

const orderApi = {
    getAll: () => {
        const url = '/order/getAll';
        return axiosClient.get(url);
    },
    create: data => {
        const url = '/order/create';
        return axiosClient.post(url, data);
    },
    delete: id => {
        const url = `/order/delete?id=${id}`;
        return axiosClient.put(url);
    }
};

export default orderApi;