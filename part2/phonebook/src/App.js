import {useState,React,useEffect} from 'react'
import axios from 'axios'
import Form from './components/Form'
import Persons from './components/Persons'
import Filter from './components/Filter'
import service from './components/service/servicepersons'
import Message from './components/Message'

function App() {
  const [persons,setPersons] = useState([''])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message,setMessage] = useState('')
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/persons');
        setPersons(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

    const handleAddPerson = async (event) => {
      event.preventDefault();
      const personToAdd = persons.find(person=> person.name.toLowerCase()=== newName.toLowerCase())
      const updatedPerson = { ...personToAdd, number: newNumber }
      if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
        if (window.confirm(newName + ` is already added to phonebook replace the old number with new one?`)) {
          try {
            const returnedPerson = await service.update(updatedPerson.id, updatedPerson)
            setPersons(persons.map((personItem) => personItem.id !== personToAdd.id ? personItem : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(
              `${updatedPerson.name} was successfully updated`
            )
          } catch (error) {
            console.error(error)
          }
        }
      } else {
        const newPerson = { name: newName, number: newNumber };
        try {
          const returnedPerson = await service.create(newPerson);
          setPersons([...persons, returnedPerson]);
          setNewName('');
          setNewNumber('');
          setMessage(
            `${newName} was successfully added`
          )
        } catch (error) {
          console.error(error);
        }
      }
    };
  
  const handleDeletePerson=(id)=>{
    const filteredPerson = persons.filter((person)=>person.id===id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      service
        .remove(personId)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
        setMessage(
          `${personName} was successfully deleted`
        )
        
    

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
      <Message message={message}/>
      <Filter value={newFilter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <Form newNumber={newNumber} newName={newName} handleAddPerson={handleAddPerson} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <Persons persons={persons}  handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App
