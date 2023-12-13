const http = require('http')
const express = require("express");
const app = express()
app.use(express.json())
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
  app.get("/",(request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  app.get("/api/notes",(req,resp) => {
    resp.json(notes)
  })
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
      response.send(note);
    }
    else {
      response.status(404).end()
    }
  })
  
  app.delete('/api/notes/:id',(req,res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end();
  })
  app.post('/api/notes',(req,res) => {
    if(!req.body.content){
      return res.status(400).json({
        error:'content missing'
      })
    }
    const body = req.body
    const noteToAdd = {content: body.content, important: body.important || false, id:generateId()}
    notes = [...notes, noteToAdd]
    res.send(noteToAdd);
  })
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on ${PORT}`)