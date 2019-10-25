import React, {useEffect} from 'react';
import axios from "axios";
import {navigate} from "hookrouter";

function Home() {

    useEffect(()=>{

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('http://localhost:3000/users/')
            .then(() => {
                console.log('Home');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    navigate('/login')
                }
            });
    });

    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    };

    return (
        <div class="container">
            <div class="panel panel-default">
                <h1>HOME</h1>
                <div className="panel-body">
                    {localStorage.getItem('jwtToken') &&
                    <button className="btn btn-primary" onClick={logout}>Logout</button>
                    }

                    <div>
                        <p>Content here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
