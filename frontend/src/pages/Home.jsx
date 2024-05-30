import { useState } from "react"
import api from "../api"
import Posts from "../components/Posts"
import { UserProvider } from "../contexts/UserContext"

const Home = () => {

    return (
        <>
         <h1>Welcome to Home page</h1>
         <UserProvider>
         <Posts />
         </UserProvider>
        </>
    )
}

export default Home