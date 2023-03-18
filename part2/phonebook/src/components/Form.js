import React from 'react'

function Form({newName,newNumber,handleAddPerson,setNewName,setNewNumber}) {
  return (
    <div>
      <div>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input placeholder='Name' value={newName} onChange={(e)=>setNewName(e.target.value)}/>
        </div>
        <div>number: <input placeholder='number' value={newNumber} onChange={(e)=>setNewNumber(e.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Form
