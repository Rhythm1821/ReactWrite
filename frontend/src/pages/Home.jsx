import { useState } from "react"
import api from "../api"
import Posts from "../components/Posts"

const Home = () => {

    return (
        <>
         <h1>Welcome to Home page</h1>
         <Posts />
        </>
    )
}

export default Home