import React, {useEffect, useState} from 'react';
import {navigate} from "hookrouter";
import axios from 'axios';
import TodoList from './todolist';
import FormDialog from './dialog';

function List() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {

    });

    const refreshTodos = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('http://localhost:3000/todo')
            .then(res => {
                setTodos(res.data);
            })
            .catch((error) => {
                console.log(error.response)
                // if (error.response.status === 401) navigate('/login')
            });
    };

    /*const showTodo = (index) => {
        FormDialog(todos[index])
    };*/

    return (
        <div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 className="panel-title">
                        List of to-do items &nbsp; <br/>
                        <button className="btn btn-primary" onClick={refreshTodos}>Refresh todos</button>
                    </h3>
                </div>
                <div class="panel-body">

                    <TodoList todos={todos} />

                </div>
            </div>
        </div>
    );

}

export default List;
