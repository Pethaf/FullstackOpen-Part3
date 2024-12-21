const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password as an argument.')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.cah2bcd.mongodb.net/testDB?retryWrites=true&w=majority`

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')

    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 3) {
      // Fetch and display all entries
      console.log('phonebook:')
      Person.find({})
        .then((result) => {
          result.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
          })
          mongoose.connection.close()
        })
        .catch((err) => {
          console.error('Error fetching data:', err)
          mongoose.connection.close()
        })
    } else if (process.argv.length === 5) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })

      person
        .save()
        .then(() => {
          console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
          mongoose.connection.close()
        })
        .catch((err) => {
          console.error('Error saving person:', err)
          mongoose.connection.close()
        })
    } else {
      console.log('Incorrect number of arguments')
      mongoose.connection.close()
    }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1)
  })