const http = require('http')
const express = require("express");
const cors = require("cors");
require("dotenv").config()
const Person = require("./models/person")
const app = express()
app.use(express.static('dist'))
const morgan = require("morgan");
morgan.token('type', function (req, res) { return req.body? JSON.stringify(res.body): "" })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.json())
app.use(cors())
 const requestLogger = (request, response, next) => {
   console.log('Method:', request.method)
   console.log('Path:  ', request.path)
   console.log('Body:  ', request.body)
   console.log('---')
   next()
 }



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(requestLogger)

app.get("/api/persons",(req,res) => {
    Person.find({}).then(result => {
      res.json(result)
    })
})
app.get("/info",(req,res)=> {
    const now = new Date()
    Person.find({}).then(result => {
      res.send( 
        `<p>Phonebook has info for ${result.length} people</p>
        <p>${now.toString()}</p>`
      )
    })
})
app.get("/api/person/:id",(req,res) => {
  Person.findById(req.params.id).then(result => {
   if(result == null){
    res.status(404).end()
   }
    res.json(result)
  }).catch(error => console.log(error.message))}) 

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