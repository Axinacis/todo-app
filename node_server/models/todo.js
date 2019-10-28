const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: String,
    description: String,
    created_by: String,
    start_time: {type: Date, default: Date.now},
    end_time: {type: Date}
});

module.exports = mongoose.model('Todo', TodoSchema);