import React, { useEffect, useState } from 'react';
import './tracking.css';

function Tracking(props) {

    // const [allOrder, setAllOrder] = useState([]);

    // useEffect(() => {
    //     const fetchAllOrder = async () => {
    //         const response = await orderApi.getAll();
    //         setAllOrder(response.data);
    //     };

    //     fetchAllOrder();
    // },[]);

    const renderRepresent = represents => {
        const avatars = represents.map(item => {
            const matchUser = props.allUser.find(element => element._id === item);
            return matchUser.avatar;
        });
        return (
            <div className='group-avatar'>
                {
                    avatars.map((item, key) => (
                        <img key={key} className='avatar' src={item}></img>
                    ))
                }
            </div>
        );
    };

    if (!props.allOrder.length === 0 || props.allUser.length === 0) {
        return null;
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col'>
                    <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Money</th>
                            <th scope="col">Quality</th>
                            <th scope="col">Represents</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.allOrder.map((item, key) => (
                                item.active && <tr key={item._id}>
                                    <th scope="row">{key+1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.money}</td>
                                    <td>{item.quality}</td>
                                    <td>{renderRepresent(item.represents)}</td>
                                    <td>{item.createDate}</td>
                                    <td>{item.description}</td>
                                    <td>Edit/Remove</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}

export default Tracking;


