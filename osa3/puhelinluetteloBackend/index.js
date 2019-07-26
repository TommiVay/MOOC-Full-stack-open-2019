const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())


morgan.token('post', function getPost(request){
    return JSON.stringify(request.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post' ))

let puhelinluettelo = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123123",

    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "0402345543",

    },
    {
        id: 3,
        name: "Don Abromov",
        number: "8765434567",

    }, {
        id: 4,
        name: "Mary Poppendieck",
        number: "999922222",

    },

]



app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${puhelinluettelo.length}</p>
  <p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const num = puhelinluettelo.find(num => num.id === id)
    if (num) {
        response.json(num)
    } else {
        response.status(404).end()
    }
})



app.get('/api/persons', (request, response) => {
    response.json(puhelinluettelo)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    puhelinluettelo = puhelinluettelo.filter(num => num.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    names = puhelinluettelo.map(num => num.name)
 
    if(names.includes(body.name)){
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }


    const newNum = {
        id:  Math.floor(Math.random() * 100000),
        name: body.name,
        number: body.number,
    }

    puhelinluettelo = puhelinluettelo.concat(newNum)

    response.json(newNum)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})