import React from 'react';
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import Test from './components/test'

const routes = {
    '/': ()=> <Home />,
    '/login': ()=> <Login />,
    '/register': ()=> <Register />,
    '/test': ()=> <Test />
};
export default routes;