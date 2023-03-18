import React from 'react'
const success = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const error = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}
function Message({message}) {
  if (message.includes('ERROR')){
        return (
          <div  style={error}>
            {message}
          </div>
        )
      } else {
        return (
          <div  style={success}>
            {message}
          </div>
        )
}
}

export default Message
