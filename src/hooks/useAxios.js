import { useState } from 'react'
import axios from 'axios'
// To be loaded from env
const baseUrl = 'http://localhost:8000/api'

axios.defaults.baseURL = baseUrl
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


const useAxios = (url, method = "get", payload = {}) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    let sendRequest = async () => {
        setData(null)
        console.log('fetching data...')
        setLoading(true)
        await axios({
            method: method,
            url: url,
            data: {
                ...payload
            }
        })
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
        .catch(err => {
            console.log(err.message)
            setError(err.data)
        })
        setLoading(false)
    }

    return {sendRequest, data, loading, error}
}

export default useAxios;