import { useState, useEffect } from 'react'
import countryService from './services/countries.js'

const SearchField = ({value, onChange}) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange}/>
    </div>
  )
}

const CountryItem = ({name, onClick}) => {
  return <li>{name} <button onClick={() => onClick(name)}>show </button> </li>
}

const CountryInfo = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(l => <li key={l}>{l}</li>)}
      </ul>
      <img 
      src={country.flag}
      />
    </div>
  )

}

const CountryView = ({countries, country, onClick}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countries.length > 1) {
    return (
      <ul>
        {countries.map(c => <CountryItem name={c} onClick={onClick} key={c}/>)}
      </ul>
    )
  }
  else if (countries.length === 1 && country) {
    return (
      <CountryInfo country={country}/>
    )
  }
  else if (countries.length == 0) {
    return (
      <div>No countries match the search</div>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countryList, setCountryList] = useState([])
  const [country, setCountry] = useState(null)

  const countriesToShow = countryList.filter(c => c.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
      countryService
        .getAll()
        .then(allCountries => {
          const names = allCountries.map(c => c.name.common)
          setCountryList(names)
        })
    }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    const newCountriesToShow =countryList.filter(c => c.toLowerCase().includes(event.target.value.toLowerCase()))
    if (newCountriesToShow.length > 0) {
      fetchCountryInfo(newCountriesToShow[0])
    }
  }

  const showCountry = (countryName) => {
    console.log(countryName)
    setSearch(countryName)
    fetchCountryInfo(countryName)
  }

  const fetchCountryInfo = (countryName) => {
    countryService
      .getCountryInfo(countryName)
      .then(info => {
        const newCountry = {name: info.name.common, capital: info.capital, area: info.area,
          languages: Object.values(info.languages), flag: info.flags.png
        }
        setCountry(newCountry)
      })
  }
  

  return (
    <div>
      <SearchField value={search} onChange={handleSearch}/>
      <CountryView countries={countriesToShow} country={country} onClick={showCountry}/>
    </div>
  )
}

export default App