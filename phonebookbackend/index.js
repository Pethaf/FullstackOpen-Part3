const http = require('http')
const express = require("express");
const cors = require("cors");
require("dotenv").config()
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
}
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

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/person/:id", (req, res, next) => {
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
  }).catch((error) => next(error))
})

app.put("/api/person/:id", (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id, {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  },
    { new: true, runValidators: true, context: 'query' }

  ).then(updatedPerson =>
    res.json(updatedPerson)).catch(
      error => next(error)
    )
})
const PORT = process.env.PORT || 3001
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
