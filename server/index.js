
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

//TODO1: use express.json to get data into json format
app.use(express.json());
//TODO3: port
const PORT = process.env.PORT || 5500;

//import routes
const TodoItemRoute = require('./routes/todoitems');

//TODO4:  connect to database
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log('database Connected'))
.catch(err => console.log(err))

app.use('/', TodoItemRoute)
// use cors
app.use(cors());



//TODO2: add port and connect to server
app.listen(PORT, ()=> console.log('Server Connected'));