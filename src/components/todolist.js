import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FormDialog from './dialog';

const TodoList = ({ todos, showTodo }) => (
    <List>
        {todos.map((todo, index) => (
            <ListItem key={index.toString()} dense button>
                <Checkbox tabIndex={-1} disableRipple />
                <ListItemText primary={todo.name} />
                {/*<FormDialog buttonText='Edit' id={todo._id}/>*/}
                {console.log(todo)}
                {FormDialog(false, todo._id)}


                {/*<ListItemSecondaryAction>
                    <IconButton
                        aria-label="Edit"
                        onClick={() => {
                            showTodo(index);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </ListItemSecondaryAction>*/}
            </ListItem>
        ))}
    </List>
);

export default TodoList;
