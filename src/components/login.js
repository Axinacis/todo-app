import React, {useState} from 'react';
import axios from 'axios';
import useForm from "../formHook";
import './login.css';
import {navigate} from "hookrouter";

function Login() {

    const [message, setMessage] = useState('');

    const submitLogin = (email, password) => {
        axios.post('http://localhost:3000/users/login', {email, password})
            .then((result) => {
                localStorage.setItem('jwtToken', ('Bearer ' + result.data.token));
                setMessage('Logged in');
                console.log('Logged in')
                setTimeout(()=>{
                    navigate('/')
                }, 1500)

            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setMessage('Login failed. Username or password do not match');
                }
            });
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        }
        submitLogin(inputs.email, inputs.password);
    };

    const {inputs, handleInputChange} = useForm({email:'',password:''});

    return (
        <div class="container">
            <form class="form-signin" onSubmit={handleSubmit}>
                {message !== '' &&
                <div class="alert alert-warning alert-dismissible" role="alert">
                    {message}
                </div>
                }

                <h2 class="form-signin-heading">Please sign in</h2>

                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" class="form-control" placeholder="Email address" name="email"
                       onChange={handleInputChange} value={inputs.email} required/>

                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" class="form-control" placeholder="Password" name="password"
                       onChange={handleInputChange} value={inputs.password} required/>

                <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>

            </form>
        </div>
    );
}

export default Login;