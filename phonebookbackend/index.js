const http = require('http')
const express = require("express");
const cors = require("cors");
const app = express()
app.use(express.static('dist'))
const morgan = require("morgan");
morgan.token('type', function (req, res) { return req.body? JSON.stringify(res.body): "" })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.json())
app.use(cors())
const generateId = () => {
  return persons.length === 0 ? 1 : 
   Math.max(...persons.map(person => person.id))+1
 }
 const requestLogger = (request, response, next) => {
   console.log('Method:', request.method)
   console.log('Path:  ', request.path)
   console.log('Body:  ', request.body)
   console.log('---')
   next()
 }

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



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)


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
  const submitedPerson = {...req.body}
  if(persons.findIndex(person => person.name === submitedPerson.name) !== -1){
    return res.status(400).json({
      error: "name must be unique"
    })
  }
  else {
    const newPerson = {id:generateId(),...submitedPerson}
    persons = [...persons, newPerson]
    res.status(200).json({...newPerson})
  }

    
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 