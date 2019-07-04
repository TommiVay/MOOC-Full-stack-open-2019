import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ search, handler }) =>
  <div>find countries <input value={search} onChange={handler} /> </div>


const Maatiedot = ({ maa }) => {
  return (
    <div>
      <h1>{maa.name}</h1>
      <p>capital {maa.capital} <br />
        population {maa.population}</p>
      <h2>languages</h2>
      <ul>
        {maa.languages.map(kieli => <li key={kieli.name}>{kieli.name}</li>)}
      </ul>
      <img src={maa.flag} alt="flag" height="90" width="160" />
      <div>
        <Saa kaupunki={maa.capital} />
      </div>
    </div>
  )
}

const Saa = ({ kaupunki }) => {
  const [saa, setSaa] = useState([])
  const [icon, setIcon] = useState([])
  useEffect(() => {
    axios
      .get("http://api.apixu.com/v1/current.json?key=0553c663bae545d4b3a143356192706&q=" + kaupunki)
      .then(response => {
        setSaa(response.data.current)
        setIcon(response.data.current.condition.icon)
      })
  }, [kaupunki])
  return (
    <div>
      <h2>Weather in {kaupunki}</h2>
      <p><b>temperature:</b> {} {saa.temp_c} Celsius </p>
      <img src={icon} alt="sääIcon" />
      <p><b>wind:</b> {saa.wind_kph}kph direction {saa.wind_dir}</p>
    </div>
  )
}

const SearchResult = ({ maat, filter, handler }) => {
  if (filter === '') {
    return (
      <div>
      </div>
    )
  }
  const results = maat.filter(maa => maa.name.toLowerCase().includes(filter.toLowerCase()))
  if (Object.keys(results).length > 10) {
    return (
      <div>
        Too many results, spesify another filter
      </div>
    )
  } else if (Object.keys(results).length === 1) {
    return (
      <div><Maatiedot maa={results[0]} /></div>
    )
  }
  else {
    return (
      <div>
        {results.map(result => <div key={result.name}>{result.name} <Button maa={result} handler={handler} /></div>)}
      </div>
    )
  }
}

const Button = ({ maa, handler }) => <button onClick={() => handler({ maa })}>show</button>




const App = () => {
  const [maat, setMaat] = useState([])
  const [newSearch, setSearch] = useState('')

  const handleSearch = (event) => setSearch(event.target.value)
  const buttonHandler = ({ maa }) => setSearch(maa.name)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setMaat(response.data)
      })
  }, [])

  return (
    <div>
      <Filter search={newSearch} handler={handleSearch} />
      <SearchResult maat={maat} filter={newSearch} handler={buttonHandler} />
    </div>
  )
}

export default App;
