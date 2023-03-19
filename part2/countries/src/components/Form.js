import React from 'react'

function Form({value,onChange}) {
  return (
    <div>
    <form>
        <h6>Find countries</h6>
        <input onChange={onChange} value={value}/>
    </form>
    </div>
  )
}

export default Form
