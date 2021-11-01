const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Item = require('./models/item');

const server = express();
require('dotenv').config()
mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('na ca am conectat si baza de date'))

server.use(cors())
server.use(bodyParser.json())

// server.get('/api', (req, res) =>{
//     res.json({name: 'iftode daniel'})
// })

server.post('/api', (req, res) => {
    const newItem = new Item(req.body.data)
    newItem.save(err=> {
        if(err){
            console.log(err)
        }
    })
    console.log(req.body.data)
})

server.get('/api/getData', (req, res) => {
    Item.find({}, (err, item)=>{
        if(err){
            return console.log(err)
        }
        res.send(item)
    })
})

server.post('/api/updateActive', (req, res) => {
    Item.findOneAndUpdate({_id: req.body.id}, {active: req.body.active} ,(err, item) => {
        if(err){
            return console.log(err)
        }
        res.send(item)
    })
})

server.get('/api/onlyActive/:active', (req, res) =>{
    console.log(req.params)
    Item.find({active: req.params.active}, (err, item) => {
        if(err){
            console.log(err)
        }
        res.send(item)
    })
})

server.get('/api/onlyCompleted/:completed', (req, res) => {
    console.log(req.params)
    Item.find({completed: req.params.completed}, (err, item) => {
        if(err){
            console.log(err)
        }
        res.send(item)
    })
})

server.post('/api/deleteCompleted', (req, res) => {
    Item.deleteMany({completed: req.body.completed}, (err, item) => {
        if(err){
            console.log(err)
        }
        res.send(item)
    })
})

server.post('/api/updateCompleted', (req, res) => {
    Item.find({_id: req.body.id}, (err, item) => {
        if(item[0].active){
            Item.updateOne({_id: req.body.id},{completed: req.body.completed}, (err, item) => {
            })
        }else{
            console.log(item[0].active, 'active nu este true')
        }
        res.send(item)
    })
})

const port = process.env.PORT

server.listen(port, () => {
    console.log('the api is live')
})