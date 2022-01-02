import React, {useState} from 'react';
import './account.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import userApi from '../../api/userApi';
import { setUser } from '../../helpers/auth';

function Account() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { username, password } = formData;

    const handleChange = event => {
        const name = event.target.name;
        setFormData({...formData, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        if(username && password) {
            userApi.post({ username, password })
                .then(res => {
                    setUser(res.data);
                    toast.success('Login successfully!');
                    navigate('/order-tracking');
                })
                .catch(err => {
                    toast.error(err.response.data.errors);
                });
        }
    };

    return (
        <div className='container'>
            <ToastContainer/>
            <div className='row'>
                <div className='col'>
                    <a href='/' className='icon-login'>
                        <img alt='logo' src='/Assets/images/logo.png'></img>
                        <div className='icon-login-text'>TIS</div>
                    </a>

                    <div className='form-login'>
                        <h3>Log In</h3>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label className='title' for="username">Username</Label>
                                <Input
                                    id='username'
                                    name='username'
                                    placeholder='Enter your username'
                                    type='text'       
                                    onChange={handleChange}
                                    value={username}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className='title' for="password">Password</Label>
                                <Input
                                    id='password'
                                    name='password'
                                    placeholder='Enter your password'
                                    type='password'
                                    onChange={handleChange}
                                    value={password}
                                />
                            </FormGroup>
                            <Button type='submit' className="btn btn-login">
                                <div className='icon-btn-login'>
                                    <img alt='logo' src='/Assets/images/logov2.png'></img>
                                    <div>Log In</div>
                                </div>
                            </Button>
                        </Form>
                    </div>

                    <a href='/' className='text-forgot'>Forgot password?</a>
                    <div className='text-forgot'>You can also continue with guest</div>
                </div>
            </div>
        </div>
    );
}

export default Account;
