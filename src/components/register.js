import React from 'react';
import axios from 'axios';
import './login.css';
import {navigate} from 'hookrouter'
import useForm from "../formHook";

const Register = function () {

    const submitRegistration = function (name, email, password) {

        axios.post('http://localhost:3000/users/', {name, email, password})
            .then((result) => {
                localStorage.setItem('jwtToken', ( 'Bearer ' + result.data.token));
                navigate('/login')
            });
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        }
        submitRegistration(inputs.name,inputs.email,inputs.password)
    };

    const {inputs, handleInputChange} = useForm({name:'',email:'',password:''});

    return (
        <div class="container">
            <form class="form-signin" onSubmit={handleSubmit}>
                <h2 class="form-signin-heading">Register</h2>

                <label htmlFor="inputName" className="sr-only">Name</label>
                <input type="text" className="form-control" placeholder="Name" name="name" value={inputs.name}
                       onChange={handleInputChange} required/>

                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" className="form-control" placeholder="Email address" name="email" value={inputs.email}
                       onChange={handleInputChange} required/>

                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" className="form-control" placeholder="Password" name="password"
                       value={inputs.password} onChange={handleInputChange} required/>

                <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
        </div>
    );

};

export default Register;
