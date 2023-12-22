const http = require('http')
const express = require("express");
const cors = require("cors");
require("dotenv").config()
const Person = require("./models/person")
const app = express()
app.use(express.static('dist'))
const morgan = require("morgan");
morgan.token('type', function (req, res) { return req.body ? JSON.stringify(res.body) : "" })
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

app.get("/api/persons", (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})
app.get("/info", (req, res) => {
  const now = new Date()
  Person.where({}).countDocuments().then(result => {
    res.send(
      `<p>Phonebook has info for ${result} people</p>
        <p>${now.toString()}</p>`
    )
  })
})
app.get("/api/person/:id", (req, res) => {
  Person.findById(req.params.id).then(result => {
    if (result == null) {
      res.status(404).end()
    }
    res.json(result)
  }).catch(error => console.log(error.message))
})

app.delete("/api/person/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
})
app.post("/api/persons/", (req, res) => {
  const body = req.body;
  if (!body.name || !body.phoneNumber) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  const person = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber
  })
  person.save().then(savedPerson => {
    res.json(savedPerson);
  })
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 