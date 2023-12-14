const http = require('http')
const express = require("express");
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get("/api/persons",(req,res) => {
    res.json(persons);
})
app.get("/info",(req,res)=> {
    const now = new Date()
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${now.toString()}</p>`
    )
})
app.get("/api/person/:id",(req,res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(!person){
        res.status(404).end();
    }
    else {
        res.json(person).status(200)
    }
})
app.delete("/api/person/:id",(req,res)=>{
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id )
  res.status(204).end()
})
app.post("/api/persons/",(req, res) => {
  const body = req.body;
  if(!req.body.name || ! req.body.number){
    return res.status(400).json({
      error:'content missing'
    })
  }
  
})
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on ${PORT}`)