import React from 'react'

function Persons({persons}) {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((persons,index)=>(
        <div key={index}>
          {persons.name} : {persons.number}
        </div>
      ))
      }
    </div>
  )
}

export default Persons
