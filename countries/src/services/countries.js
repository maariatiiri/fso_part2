import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const promise = axios.get(`${baseUrl}api/all`)
    return promise.then(response => response.data)
}

const getCountryInfo = name => {
    const promise = axios.get(`${baseUrl}api/name/${name.toLowerCase()}`)
    return promise.then(response => response.data)
}

const getWeatherInfo = (lat, lon) => {
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`)
    return promise.then(response=>response.data)
}

export default { getAll, getCountryInfo, getWeatherInfo }