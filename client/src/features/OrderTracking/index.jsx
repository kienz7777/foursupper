import React, { useEffect, useState } from 'react';
import './order-tracking.css';
import userApi from '../../api/userApi';
import orderApi from '../../api/orderApi';
import Order from './components/Order';
import Tracking from './components/Tracking';
import Result from './components/Result';

function OrderTracking() {

    const [allUser, setAllUser] = useState([]);
    const [allOrder, setAllOrder] = useState([]);

    useEffect(() => {
        const fetchAllUser = async () => {
            const response = await userApi.getAll();
            setAllUser(response.data);
        };
        const fetchAllOrder = async () => {
            const response = await orderApi.getAll();
            setAllOrder(response.data);
        };

        fetchAllUser();
        fetchAllOrder();
    },[]);

    return (
        <div>
            <Order allUser={allUser} setAllOrder={setAllOrder}/>
            <Tracking allUser={allUser} allOrder={allOrder}/>
            <Result allUser={allUser} allOrder={allOrder}/>
        </div>
    )
}

export default OrderTracking;
