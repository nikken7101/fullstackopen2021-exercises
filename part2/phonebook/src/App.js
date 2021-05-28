import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons.sort((p1, p2) => p1.id - p2.id)))
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName && p.number === newNumber)) {
      alert(`${newName} is already in phonebook.`)
      return
    }
    const newPerson = { name: newName, number: newNumber }
    const replacedPerson = persons.find(p => p.name === newName && p.number !== newNumber)
    if (replacedPerson) {
      if (window.confirm(`${newName} is already in phonebook. Replace the old number with new one?`)) {
        personService.update(replacedPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== replacedPerson.id).concat(returnedPerson).sort((p1, p2) => p1.id - p2.id))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name} ?`)) {
      personService.remove(person.id).then(res => setPersons(persons.filter(p => p.id !== person.id)))
    }
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
      <Persons persons={persons} filterTerm={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App