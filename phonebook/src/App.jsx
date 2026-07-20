import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => <p>{person.name} {person.number}</p>

const Filter = ({value, handler}) => {
  return (
    <form>
      <div>
        filter shown with <input value={value} onChange={handler}/>
      </div>
    </form>
  )
}

const PersonForm = ({newName, nameHandler, newNumber, numberHandler, onSubmit}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={nameHandler}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={numberHandler}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <div>
        {personsToShow.map(person => <Person person={person} key={person.id}/>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {name: newName, number: newNumber, id: String(persons.length + 1)}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} nameHandler={handleNameChange}
       newNumber={newNumber} numberHandler={handleNumberChange} 
       onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App