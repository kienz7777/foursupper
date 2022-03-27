import React, { useEffect, useState } from 'react';
import './tracking.css';
import orderApi from '../../../../api/orderApi';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

function Tracking(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [allOrder, setAllOrder] = useState([]);

    useEffect(() => {
        const fetchAllOrder = async () => {
            const response = await orderApi.getAll();
            setAllOrder(response.data);
        };

        fetchAllOrder();
    },[props.allOrder]);

    const handleToggleModal = id => {
        setIsOpen(!isOpen);
        setUserId(id);
    };

    const handleRemove = () => {
        orderApi.delete(userId)
            .then(async res => {
                const response = await orderApi.getAll();
                setAllOrder(response.data);
                props.setAllOrder(response.data);
                toast.success('Remove successfully!');
                setIsOpen(false);
            })
            .catch(err => {
                toast.error('Remove not success!');
            });
    };

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

    if (!allOrder.length === 0 || props.allUser.length === 0) {
        return null;
    }
    else {
        const allActiveOrder = allOrder.filter(item => item.active);
        return (
            <div className='container mt-5'>
                <ToastContainer/>
                <div className='row'>
                    <div className='col'>
                        <div className='table-tracking'>
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
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allActiveOrder.map((item, key) => (
                                            <tr key={item._id}>
                                                <th scope="row">{key+1}</th>
                                                <td>{item.username}</td>
                                                <td>{item.money}</td>
                                                <td>{item.quality}</td>
                                                <td>{renderRepresent(item.represents)}</td>
                                                <td>{item.createDate}</td>
                                                <td>{item.description}</td>
                                                <td className='btn-remove'>
                                                    <Button onClick={() => handleToggleModal(item._id)} className="btn btn-danger">Remove</Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
    
                        <Modal isOpen={isOpen} toggle={handleToggleModal}>
                            <ModalHeader toggle={handleToggleModal}>Remove</ModalHeader>
                            <ModalBody>
                                Do you want remove?
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleRemove} color="primary">Confirm</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tracking;


