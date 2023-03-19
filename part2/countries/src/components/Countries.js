import React, { useEffect } from 'react'

function Countries({country}) {
    // if(!country){
    //     console.log("Country illa")
    // }
    // else
  return (
    <div>
      {country && <><h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {Object.entries(country.languages).map(([i, value]) => 
        (<li key={i}>{value}</li>))
        }
      </ul>
      <img src={country.flag} alt="Country flag"></img></>}
    </div>
  )
}

export default Countries
