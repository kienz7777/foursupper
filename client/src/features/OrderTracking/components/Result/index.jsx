import React, { useState } from 'react';

function Result (props) {

    const { allUser, allOrder } = props;

    const calculatePayment = () => {
        const result = [];
        allUser.forEach(item => {
            result.push({ userId: item._id, name: item.username, payment: 0 });
        });

        allUser.forEach(item => {
            const order = allOrder.filter(x => x.userId === item._id);
            const indexUser = result.findIndex(x => x.userId === item._id);
    
            indexUser !== -1 && order.forEach(element => {
                const payment = element.money / element.quality;
    
                result.map((x, index) => {
                    if (index !== indexUser && element.represents.includes(x.userId)) {
                       x.payment += (-1)*payment;
                    }
                });
    
                if (element.represents.includes(item._id)) {
                    result[indexUser].payment += payment*(element.represents.length-1);
                } else {
                    result[indexUser].payment += element.money;
                }
            });
        });
        return result;
    };

    const result = calculatePayment();

    if (!props.allOrder.length === 0 || props.allUser.length === 0) {
        return null;
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                {
                                    result.map((item, key) => (
                                        <th scope="col">{item.name}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                    result.map((item, key) => (
                                        <td scope="col">{item.payment}</td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Result;
