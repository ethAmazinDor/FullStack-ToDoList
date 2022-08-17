const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res) => {
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({ completed: false })
    res.render('index.ejs', { items: todoItems, left: itemsLeft })
})



app.post('/addToDo', (req, res) => {
    db.collection('todos').insertOne({ thing: req.body.todoItem, completed: false })
        .then(result => {
            console.log('todo Added')
            res.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/markUncomplete', (req, res) => {
    db.collection('todos').updateOne({ thing: req.body.itemsFromJS }, {
        $set: {
            completed: false
        }
    })
        .then(result => {
            console.log('uncheck complete')
            res.json('uncheck complete')
        })
})

app.delete('/deleteItem', (req, res) => {
    db.collection('todos').deleteOne({ thing: req.body.itemFromJS })
        .then(result => {
            console.log('todo deleted')
            res.json('todo deleted')
        })
        .catch(error => console.log(error))
})

app.put('/markComplete', (req, res) => {
    db.collection('todos').updateOne({ thing: req.body.itemFromJS }, {
        $set: {
            completed: true
        }
    }, {
        sort: { _id: -1 },
        upsert: false
    })
        .then(result => {
            console.log('marked complete')
            res.json('marked complete')
        })
        .catch(error => console.error(error))
})



app.listen(process.env.PORT || PORT, () => {
    console.log(`port running on port: ${PORT}`)
}) 