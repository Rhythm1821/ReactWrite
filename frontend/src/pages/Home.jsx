import { useState } from "react"
import api from "../api"

const Home = () => {

    const [data, setData] = useState(null)

    api.get('/users/')
    .then(res => {
        setData(res.data)
        console.log(res.data)
    })
    .catch(err => console.log(err))

    return (
        <>
         <h1>Home</h1>
         {JSON.stringify(data)}
        </>
    )
}

export default Home