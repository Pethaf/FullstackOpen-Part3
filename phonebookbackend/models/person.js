const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const URL = process.env.MONGODB_URI
console.log(`connecting to ${URL}`)
mongoose.connect(URL).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log(`error connecting to MongoDB: ${error.message}`)
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3,'Username needs to be at least 3 characters long'],
    required: [true,'Need to provide username'],
    unique: true
  },
  phoneNumber: {
    type: String,
    minlength: [8,'Phone number needs to be at least 8 characters long'],
    required: [true,'Need to provide phone number'],
    validate: {
      validator: function(arg) {
        return /^\d{2,3}-\d{1,}$/.test(arg)
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }

})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)