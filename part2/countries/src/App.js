import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      find countries: <input value={props.value} onChange={props.handler} />
    </div>)
}


const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.cioc} width="200" />
    </div>
  )
}

const CountryList = ({ countries, setFilter }) => {
  return (
    <div>
      {countries.map(c => <p key={c.name}>{c.name} <button onClick={() => setFilter(c.name)}>show</button> </p>)}
    </div>
  )

}

const MainArea = ({ countries, setFilter }) => {
  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length === 1) return <Country country={countries[0]} />
  return <CountryList countries={countries} setFilter={setFilter} />
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const selectedCountries = countries.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <Filter value={newFilter} handler={event => setNewFilter(event.target.value)} />
      <MainArea countries={selectedCountries} setFilter={setNewFilter} />
    </div>
  )
}

export default App