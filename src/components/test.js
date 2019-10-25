import React from 'react';
// import useForm from "../formHook";

const Test = function () {


    return (
        <div class="container">
            <form class="form-signin">
                <h2 class="form-signin-heading">Register</h2>

                <label htmlFor="inputName" className="sr-only">Name</label>
                <input type="text" className="form-control" placeholder="Name" name="name" required/>

                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" className="form-control" placeholder="Email address" name="email" required/>

                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" className="form-control" placeholder="Password" name="password"
                       required/>

                <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Test;
