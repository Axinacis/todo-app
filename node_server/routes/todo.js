const express = require('express');
const Todo = require('../models/todo');
const auth = require('../auth.js');
const todoRouter = new express.Router();

todoRouter.post('/todo/', auth, async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).send({todo})
    } catch (e) {
        res.status(400).send(e)
    }
});


todoRouter.get('/todo/', async (req, res) => {
    try {
        const todo = await Todo.find({});
        res.send(todo)
    } catch (e) {
        res.status(500).send(e)
    }
});

todoRouter.get('/todo/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOne({_id: req.params.id});
        if (!todo) {
            return res.status(404).send()
        }
        await todo.save();
        res.send(todo)
    } catch (e) {
        res.status(500).send()
    }
});


todoRouter.patch('/todo/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'end_time'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const todo = await Todo.findOne({_id: req.params.id});
        if (!todo) {
            return res.status(404).send()
        }
        updates.forEach((update) => todo[update] = req.body[update]);
        await todo.save();
        res.send(todo)
    } catch (e) {
        res.status(500).send()
    }
});


todoRouter.get('/todo/', auth, async (req, res) => {
    const match = {};
    const mySort = {};

    if (req.query.sortBy) {
        const sortArr = req.query.sortBy.split(':');
        mySort[sortArr[0]] = sortArr[1].match(/^(desc|descending|-1)$/) ? -1 : 1
    }

    if (req.query.name) {
        match.name = req.query.name
    }

    if (req.query.description) {
        match.description = req.query.description
    }

    if (req.query.created_by) {
        match.created_by = req.query.created_by
    }

    if (req.query.start_time) {
        match.start_time = req.query.start_time
    }

    try {
        const searchQuery = await Todo.find(match).sort(mySort);
        res.send(searchQuery)
    } catch (e) {
        res.status(500).send(e)
    }
});




todoRouter.delete('/todo/:id', auth, async (req, res) => {
    try {
        const book = await Todo.findOneAndDelete({_id: req.params.id});
        if (!book) {
            return res.status(404).send()
        }
        res.send(book)
    } catch (e) {
        res.status(500).send(e)
    }
});


module.exports = todoRouter;
