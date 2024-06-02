import Posts from "../components/Posts"
import { UserProvider } from "../contexts/UserContext"


const Home = () => {

    return (
        <>
         
         <UserProvider>
         <Posts />
         </UserProvider>

        </>
    )
}

export default Home