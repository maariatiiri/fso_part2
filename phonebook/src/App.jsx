import { useState } from 'react'

const Person = ({person}) => <p>{person.name} {person.number}</p>

const Filter = ({value, handler}) => {
  return (
    <form>
      <div>
        filter shown with <Input value={value} handler={handler}/>
      </div>
    </form>
  )
}

const Input = ({value, handler}) => <input value={value} onChange={handler}/>

const PersonForm = ({newName, nameHandler, newNumber, numberHandler, onSubmit}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <Input value={newName} handler={nameHandler}/>
      </div>
      <div>
        number: <Input value={newNumber} handler={numberHandler}/>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

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