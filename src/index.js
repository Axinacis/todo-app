import React from 'react';
import ReactDOM from 'react-dom';
import {useRoutes, A, navigate} from 'hookrouter'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import routes from './routes'

function App() {
    const routeResult = useRoutes(routes);

    const logout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login')
    };

    return (
        <div className='App'>
            <div className='sidenav'>
                <A href='/'> Home </A><br/>
                <A href='/login'> Login </A><br/>
                <A href='/register'> Register </A><br/>
                <A href='/list'> List of todos </A><br/>


                {localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={logout}>Logout</button>}
            </div>

            <div className='main'>
            {routeResult}
            </div>

        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));