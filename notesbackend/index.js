require("dotenv").config()
const http = require('http')
const express = require("express");
const app = express()
app.use(express.json())
const Note = require('./models/note')

  app.get("/",(request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })
  app.get('/api/notes/:id', (request, response) => {
      Note.findById(request.params.id).then(note => {
        response.json(note)
      })
  })
  
  app.delete('/api/notes/:id',(req,res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end();
  })
  app.post('/api/notes',(req,res) => {
    const body = req.body
    if(body.content == undefined){
      return res.status(400).json({
        error:'content missing'
      })
    }
    const note = new Note({
      content: body.content,
      important: body.important || false
    })
    note.save().then(savedNote => {
      res.json(savedNote);
    })
  })
const PORT = process.env.PORT
app.listen(PORT);
console.log(`Server running on ${PORT}`)