const express = require('express');
const mongoose = require('mongoose');

const Todos = require('./dbModel.js');

// APP CONFIG
const app = express();
const port = process.env.PORT || 9000;

// MIDDLEWARE
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

// DB CONFIG
mongoose.connect('mongodb+srv://todonick:IgDviUqLgnqg3NYA@cluster0.j3rdy.mongodb.net/todos?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => console.log('DB is connected'))

// API ROUTES
app.get('/', (req, res) => res.status(200).send('WORKING'))

app.get('/getTodos', (req, res) => {
    Todos.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/todos', (req, res) => {
    const dbTodo = req.body

    Todos.create(dbTodo, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//LISTENER
app.listen(port, () => console.log(`listening on localhost:${port}`));