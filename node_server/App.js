const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const cors = require('cors');
const config = require('./database.js');
const fs = require('fs');
const app = express();

process.env.privateKEY  = fs.readFileSync('./private.key', 'utf8');
process.env.publicKEY  = fs.readFileSync('./public.key', 'utf8');

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

const port = '3000';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.json());

app.use([userRouter, todoRouter]);

app.listen(port, () => {
    console.log('Listening to port ' + port)
});


