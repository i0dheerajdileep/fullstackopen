import React from 'react'
import Country from './Countries'
function Content({countries}) {
    if(countries.length>10)
    {
      return (
          <p>
            Too many matches, specify another filter
          </p>
        )
    }
    else{
      return(<Country country={countries[0]}/>)
    }
}

export default Content
