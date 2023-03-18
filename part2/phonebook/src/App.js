import {useState,React} from 'react'
import Form from './components/Form'
import Persons from './components/Persons'
import Filter from './components/Filter'
function App() {
  const [persons,setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const handleAddPerson=(event)=>{
    event.preventDefault()
        
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase()))
    {
      alert(newName+ ` is already added to phonebook`)
    }
    else{
      const newPerson = { name: newName,number: newNumber };
      setPersons([...persons,newPerson])
      setNewName('')
      setNewNumber('')
    }
  }
  const handleFilter=(event)=>{
    setNewFilter(event.target.value)
    const regex = new RegExp( newFilter, 'i' );
    const filteredPersons = () => persons.filter(person => person.name.match(regex))
    setPersons(filteredPersons)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <Form newNumber={newNumber} newName={newName} handleAddPerson={handleAddPerson} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <Persons persons={persons} />
    </div>
  )
}

export default App
