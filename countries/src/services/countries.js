import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    const promise = axios.get(`${baseUrl}api/all`)
    return promise.then(response => response.data)
}

const getCountryInfo = name => {
    const promise = axios.get(`${baseUrl}api/name/${name.toLowerCase()}`)
    return promise.then(response => response.data)
}

export default { getAll, getCountryInfo }