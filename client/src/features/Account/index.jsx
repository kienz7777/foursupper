import React, {useState} from 'react';
import './account.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import userApi from '../../api/userApi';

function Account() {

    const [formData, setFormData] = useState({ username: '', password: '' });
    const { username, password } = formData;

    const handleChange = event => {
        const name = event.target.name;
        setFormData({...formData, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(process.env.REACT_APP_API_URL);

        if(username && password) {
            userApi.post({username, password})
                .then(res => console.log(res))
                .catch(err => console.log(err));
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
