//import mongoose to create new schems
const mongoose = require('mongoose');

//create Schema
const TodoItemSchema = new mongoose.Schema({
    item: {
        type:String,
        required: true
    }
});

//export this schema
module.exports = mongoose.model('todo', TodoItemSchema);