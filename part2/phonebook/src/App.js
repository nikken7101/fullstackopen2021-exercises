import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handler={event => setNewFilter(event.target.value.toLowerCase())} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={newName} handleNameChange={event => setNewName(event.target.value)}
        number={newNumber} handleNumberChange={event => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterTerm={newFilter} />
    </div>
  )
}

export default App