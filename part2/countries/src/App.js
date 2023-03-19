import './App.css';
import React,{useState,useEffect} from 'react';
import Form from './components/Form'
import axios from 'axios';
import Content from './components/Content'
function App() {
  const [countries,setCountries] = useState([])
  const [newFilter,setnewFilter] = useState('')
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response=>{
      console.log("promise fullfilled")
      setCountries(response.data)
      console.log(response.data)
    }).catch(err => console.log(err))
  },[])
  const handleFilterChange =(event)=>{
    setnewFilter(event.target.value)
    if (event.target.value) {
      const regex = new RegExp(event.target.value, "i");
      const filteredCountries = () => countries.filter((country) =>
        country.name.common.match(regex)
      )
      setCountries(filteredCountries);
  }
  }

  return (
    <div>
      <Form value={newFilter} onChange={handleFilterChange}/>
      <Content countries={countries}/>
    </div>
  );
}


export default App;
