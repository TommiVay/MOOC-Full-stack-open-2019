const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator');


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        minlength: 8
    }
})

personSchema.plugin(uniqueValidator, { message: 'Error, expected name to be unique.' });

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)