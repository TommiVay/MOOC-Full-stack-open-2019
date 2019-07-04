import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import notification from './components/Notification'
import './index.css'

const Persons = ({ persons, filter, handleDelete }) => {
    if (filter === '') {
        return (
            <div>
                {persons.map(person =>
                    <div key={person.name}>{person.name} {person.number}
                        <button onClick={() => handleDelete(person)}>delete</button>
                    </div>)}
            </div>
        )
    } else {
        const results = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        return (
            <div>
                {results.map(result =>
                    <div key={result.name}>{result.name} {result.number}
                        <button onClick={() => handleDelete(result)}>delete</button>
                    </div>)}
            </div>
        )
    }
}


const Filter = ({ search, handler }) =>
    <div> filter show with <input value={search} onChange={handler} /> </div>

const PersonForm = (props) => {
    return (
        <form onSubmit={props.handler}>
            <div>
                name: <input value={props.newName} onChange={props.nameChange} />
            </div>
            <div>number: <input value={props.newNumber} onChange={props.numberChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [newSearch, setSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNumber(event.target.value)
    const handleSearch = (event) => setSearch(event.target.value)

    useEffect(() => {
        personService
            .getAll()
            .then(persons => {
                setPersons(persons)
            })
    }, [])

    

    const deletePerson = person => {
        if (window.confirm("Are you sure you want to delete person?"))
            personService
                .deleteRow(person.id)
                .then(deleted => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    setMessage(
                        `${person.name} deleted`
                      )
                      setTimeout(() => {
                        setMessage(null)
                      }, 5000)
                })
                .catch(error => {
                    setErrorMessage(
                        `information of ${person.name} has already been removed from server`
                      )
                      setTimeout(() => {
                        setErrorMessage(null)
                      }, 5000)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
    }



    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name: newName,
            number: newNumber
        }
        let names = persons.map((person) => person.name)

        if (names.includes(personObj.name)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const oldObj = persons.filter(person => { return person.name === personObj.name})[0]
                console.log(oldObj.id)
                personService
                    .update(oldObj.id, personObj)
                    .then(returnedObj => {
                    setPersons(persons.map(person => person.id !== oldObj.id ? person : returnedObj))
                    setMessage(
                        `${oldObj.name} updated`
                      )
                      setTimeout(() => {
                        setMessage(null)
                      }, 5000)
                })
                    .catch(error => {
                        setErrorMessage(
                            `information of ${oldObj.name} has already been removed from server`
                          )
                          setTimeout(() => {
                            setErrorMessage(null)
                          }, 5000)
                        setPersons(persons.filter(p => p.id !== oldObj.id))
                    })
            }
        } else {
            personService
                .create(personObj)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNumber('')
                    setMessage(
                        `Added ${returnedPerson.name}`
                      )
                      setTimeout(() => {
                        setMessage(null)
                      }, 5000)
                })
        }

    }

    return (
        <div>
            <h2>Phonebook</h2>
            <notification.success message={message}/>
            <notification.error message={errorMessage}/>
            <Filter search={newSearch} handler={handleSearch} />
            <h2>add a new</h2>
            <PersonForm handler={addPerson} newName={newName}
                nameChange={handleNameChange} newNumber={newNumber}
                numberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={newSearch} handleDelete={deletePerson} />
        </div>
    )

}

export default App