import React, { useState } from 'react';
import './order.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import moment from 'moment';
import orderApi from '../../../../api/orderApi';
import { ToastContainer, toast } from 'react-toastify';

function Order(props) {

    const initOrder = {
        userId: '',
        username: '',
        money: 0,
        quality: 0,
        description: '',
        createDate: moment(new Date()).format('MM-DD-yyyy'),
        represents: [],
        active: true
    };
    const animatedComponents = makeAnimated();
    const [represents, setRepresent] = useState([]);
    const [order, setOrder] = useState(initOrder);
    const [isDefaultUser, setIsDefaultUser] = useState(true);

    const options = props.allUser.map(item => ({
        value: item._id,
        label: item.username
    }));

    const handleSelectChange = event => {
        if(event.length <= order.quality){
            const data = event.map(item => item.value);
            setRepresent(event);
            setOrder({...order, represents: data});
        }
    }

    const handleChange = event => {
        const name = event.target.name;
        let value = event.target.value;
        if (name === 'money' || name === 'quality') {
            value = parseInt(value, 10);
            setRepresent([]);
        }
        setOrder({...order, [name]: value});
    };

    const handleUsername = event => {
        const value = event.target.value;
        const username = props.allUser.find(item => item._id === value).username;

        setIsDefaultUser(false);
        setOrder({...order, username: username, userId: value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (order.username === '') {
            toast.error('Please input user name');
            return;
        }

        if (order.money > 0 && order.quality > 0) {
            if (order.quality === order.represents.length) {
                orderApi.create(order)
                .then(async res => {
                    setOrder({...initOrder, userId: order.userId, username: order.username});
                    setRepresent([]);
                    const response = await orderApi.getAll();
                    props.setAllOrder(response.data);
                    toast.success('Create successfully!');
                })
                .catch(err => toast.error(err.response.data.errors));
            } else {
                toast.error('Quality and Represent are not equal');
            }
        } else {
            toast.error('Quality and Money must greater than 0');
        }
    };

    const renderOption = (value, name, key) => <option key={key} value={value}>{name}</option>;

    if (props.allUser.length === 0) {
        return null;
    }

    return (
        <div className='container'>
            <ToastContainer/>
            <div className='row'>
                <div className='col'>
                    <div className='form-order'>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className='group-input'>
                                <Label className='title' for="username">Name</Label>
                                <Input
                                    type='select'
                                    name='userId'
                                    value={order.userId}
                                    onChange={handleUsername}
                                >
                                    { isDefaultUser && <option value={''}>None</option> }
                                    {
                                        props.allUser.map((item, key) => (
                                            renderOption(item._id, item.username, key)
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup className='group-input'>
                                <Label className='title' for="money">Money</Label>
                                <Input
                                    name='money'
                                    placeholder='Enter your money'
                                    type='number'
                                    value={order.money}     
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup className='group-input'>
                                <Label className='title' for="quality">Quality</Label>
                                <Input
                                    name='quality'
                                    placeholder='Enter your quality'
                                    type='select'
                                    value={order.quality}
                                    onChange={handleChange}
                                >
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className='group-input'>
                                <Label className='title' for="represents">Represents</Label>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    value={represents}
                                    options={options}
                                    onChange={handleSelectChange}
                                />
                            </FormGroup>
                            <FormGroup className='group-input'>
                                <Label className='title' for="description">Description</Label>
                                <Input
                                    name='description'
                                    placeholder='Enter your description'
                                    type='textarea'
                                    value={order.description}    
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup className='group-input'>
                                <Button type="submit" className="btn btn-order">Confirm</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
