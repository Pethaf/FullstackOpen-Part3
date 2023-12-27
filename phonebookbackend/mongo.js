const mongoose = require('mongoose')
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.cah2bcd.mongodb.net/phoneBookApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
})
const Person = mongoose.model('Person', personSchema)
mongoose.connect(url)

if (!name || !phoneNumber) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.phoneNumber}`)
    })
    mongoose.connection.close()
  })
}
else {
  const person = new Person({
    name: `${name}`,
    phoneNumber: `${phoneNumber}`
  })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.phoneNumber} to phonebook`)
    mongoose.connection.close()
  })

}