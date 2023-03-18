import React from 'react'

function Persons({persons,handleDeletePerson}) {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((persons,index)=>(
        <div key={index}>
            {/* {console.log(persons.id)} */}
          {persons.name} : {persons.number} <button onClick={()=>handleDeletePerson(persons.id)}>delete</button>
        </div>
      ))
      }
    </div>
  )
}

export default Persons
