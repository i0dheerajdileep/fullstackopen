const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
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
app.use(express.json())
app.use(requestLogger)
app.use(cors())
let persons = 
[
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
]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) : 0
  return maxId + 1
}
app.get('/info', (request, response) => {
  const currentDate = new Date().toLocaleString();
  const currentTime = Intl.DateTimeFormat().resolvedOptions().timeZone
  const count = persons.length
  const info = `
  <div><p>The phonebooks has ${count} persons</p><div>
  <div><p> ${currentDate} ${currentTime}</p></div>`;
  response.send(info);
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  response.json(person)
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  else if(persons.find(person => person.name === body.name))
  {
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  }
  else
  {
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(newPerson)
  response.json(persons)
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})
app.use(unknownEndpoint)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})