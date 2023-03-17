import React from 'react'
import Part from './Part'
function Content({parts}) {
  return (
    <div>
      {parts.map((part, i) =>
      <Part key={i} part={part.name} exercises={part.exercises} />
    )}
    </div>
  )
}

export default Content
