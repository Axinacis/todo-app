import React, {useEffect, useState} from 'react';
import {navigate} from "hookrouter";
import axios from 'axios';
import {Link} from 'react-router-dom';

function Show() {

    const [todo, setTodo] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/todo/' + localStorage.getItem('todoId'))
            .then(res => {
                console.log(res.data);
                const formatted = res.data;
                formatted.start_time = formatted.start_time.toString().split('T')[0];
                formatted.end_time = formatted.end_time.toString().split('T')[0];
                setTodo({formatted});
                console.log(todo);
            })
    }, [todo]);

    const remove = function (id) {
        axios.delete('http://localhost:3000/todo/' + id)
            .then((result) => {
                navigate('/')
            });
    };


    return (
        <div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        To-do item: {todo.name}
                    </h3>
                </div>
                <div class="panel-body">

                    <dl>
                        <dt>Name:</dt>
                        <dd>{todo.name}</dd>
                        <dt>Created by:</dt>
                        <dd>{todo.created_by}</dd>
                        <dt>Description:</dt>
                        <dd>{todo.description}</dd>
                        <dt>Start time:</dt>
                        <dd>{todo.start_time}</dd>
                        <dt>End time:</dt>
                        <dd>{todo.end_time}</dd>
                    </dl>
                    <Link to={`/edit/${todo._id}`} class="btn btn-success">Edit</Link>&nbsp;
                    <button onClick={remove(todo._id)} class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );

}

export default Show;
