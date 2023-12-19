require("dotenv").config()
const http = require('http')
const express = require("express");
const app = express()
app.use(express.json())
const Note = require('./models/note')

app.get("/", (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    }
    else {
      response.status(404).end()
    }
  }).catch(error => {
    console.log(error)
    response.status(500).end()
  })
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(request.params.id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
})
app.post('/api/notes', (req, res) => {
  const body = req.body
  if (body.content == undefined) {
    return res.status(400).json({
      error: 'content missing'
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

app.put('/api/notes/:id',(req, res,next)=> {
  const body = req.body 
  const note = {
    content: body.content,
    important: body.important
  }
  Note.findByIdAndUpdate(request.params.id, note ,{new: true}).then(updatedNote => {
    res.json(updatedNote)
  }).catch(error => next(error))
})
const PORT = process.env.PORT
app.listen(PORT);
console.log(`Server running on ${PORT}`)