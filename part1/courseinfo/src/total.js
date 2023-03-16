import React from 'react'

function total(props) {
  return (
    <div>
      <p>Number of exercises = {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </div>
  )
}

export default total
