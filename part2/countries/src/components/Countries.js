import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Countries({country}) {
    // if(!country){
    //     console.log("Country illa")
    // }
    // else
    const [weather,setWeather] = useState([])
    useEffect(()=>{
      // const params={
      //   api_key: process.env.REACT_APP_API_KEY,
      //   lat: 60.165249
      //   lon:
      // }
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse)
        // console.log(`Current temperature in is ${apiResponse.current.temperature}℃`);
        setWeather([apiResponse])
        console.log('set is done',weather)
      }).catch(error => {
        console.log(error);
    })
    },[])
    const renderData = weather.map((item) => (
      <div>
        <p>temperature {item.main.temp} kelvin</p>
        <img src={item.weather[0].icon.png} alt="Weather icon"></img>
        <p>wind {item.wind.speed}m/s</p>
      </div> 
    ));
 
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
      <img src={country.flags.png} alt="Country flag"></img>
      <h3>Weather in {country.capital}</h3>
      {renderData}
      
      {/* {weather && <p>{weather}</p>} */}
      
      </>}
    </div>
  )
  
}

export default Countries
