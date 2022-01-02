import axiosClient from "./axiosClient";

const orderApi = {
    create: data => {
        const url = '/order/create';
        return axiosClient.post(url, data);
    }
};

export default orderApi;