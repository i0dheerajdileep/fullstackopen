const mongoose = require('mongoose')

if (process.argv.length<4) {
  console.log('give password as argument')
}

const password = process.argv[2]
const Name = process.argv[3]
const Number = process.argv[4]
const url =
  `mongodb+srv://idheerajdileep:${password}@cluster0.9ol95ug.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    "name": String,
    "number": String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name : Name,
    number : Number
})

person.save().then(result => {
  console.log('contact saved!')
  mongoose.connection.close()
})

Person
.find({})
.then(persons => {
    persons.forEach(person => {
    console.log(person)
    })
    mongoose.connection.close()
  })