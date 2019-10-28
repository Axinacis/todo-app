import React from 'react';
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import Test from './components/test'
import Show from './components/show'
import List from './components/list'

const routes = {
    '/': ()=> <Home />,
    '/login': ()=> <Login />,
    '/register': ()=> <Register />,
    '/test': ()=> <Test />,
    '/show': ()=> <Show />,
    '/list': ()=> <List />
};

export default routes;