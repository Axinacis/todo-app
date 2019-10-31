import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import useForm from "../formHook";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

export default function FormDialog(newTodo = false, id) {
    const [open, setOpen] = React.useState(false);
    let values = {};
    // const todoID = id.id;
    const classes = useStyles();

        useEffect(() => {

        },[values]);

    let {inputs, handleInputChange, updateInputs, resetInputs} = useForm({
        name: '',
        description: '',
        end_time: '',
        start_time: '',
        created_by: ''
    });

    const handleClickOpen = () => {
        resetInputs();
        if (!newTodo) {
            axios.get('http://localhost:3000/todo/' + id)
                .then(res => {
                    console.log(res.data);
                    values = {...res.data};
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseWithSave = () => {
        const data = ({name: inputs.name, description: inputs.description, end_time: inputs.end_time});
        if (!newTodo) {
            axios.patch('http://localhost:3000/todo/' + id, JSON.stringify(data))
                .then(res => console.log(res.data));
        } else {
            axios.post('http://localhost:3000/todo/', JSON.stringify(data))
                .then(res => console.log(res.data));
        }
        setOpen(false);
        window.location.reload()
    };

    return (
        <div>

                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    {newTodo ? 'Add new todo' : 'Edit'}
                </Button>


            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{newTodo ? 'Add new todo' : 'Edit todo'}</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Todo contents:
                    </DialogContentText>
                    <form className={classes.container}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="standard-full-width"
                            label="Todo name"
                            type="text"
                            value={inputs.name}
                            defaultValue={values.name}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            required
                            margin="dense"
                            id="standard-multiline-flexible"
                            label="Description"
                            rowsMax="4"
                            type="text"
                            value={inputs.description}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            disabled
                            margin="dense"
                            id="standard-disabled"
                            label="Created by"
                            type="text"
                            value={inputs.created_by}
                            fullWidth
                        />
                        <TextField
                            disabled
                            margin="dense"
                            id="standard-disabled"
                            label="Start time"
                            type="text"
                            value={inputs.start_time}
                            fullWidth
                        />
                        <TextField
                            required
                            margin="dense"
                            id="standard-full-width"
                            label="End time"
                            type="text"
                            onChange={handleInputChange}
                            value={inputs.end_time}
                            fullWidth
                        />
                    </form>
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={handleCloseWithSave} color="primary">
                        Save
                    </Button>

                </DialogActions>

            </Dialog>
        </div>
    );
}