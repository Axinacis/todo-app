import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
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

export default function FormDialog(id) {
    const [open, setOpen] = React.useState(false);
    let values = {name:'',description:'',created_by:''};
    const todoID = id.id;
    const classes = useStyles();

    const {inputs, handleInputChange} = useForm({
        name:'',
        description:'',
        created_by:''
    });

    const handleClickOpen = () => {
        console.log(id)
        console.log(todoID)
        axios.get('http://localhost:3000/todo/' + todoID)
            .then(res => {
                console.log(res.data)
                values = {...res.data}
            });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit todo</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Todo contents:
                    </DialogContentText>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Uncontrolled"
                            label="Todo name"
                            type="text"
                            value={inputs.name}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
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
                            margin="dense"
                            id="standard-read-only-input"
                            label="Created by"
                            type="text"
                            value={inputs.created_by}
                            fullWidth
                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}