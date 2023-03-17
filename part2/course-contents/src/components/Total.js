import React from 'react'

function Total({parts}) {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <h3>total of  {total}</h3>
    </div>
  )
}

export default Total
