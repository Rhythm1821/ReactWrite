import Posts from "../components/Posts"
import { UserProvider } from "../contexts/UserContext"


const Home = () => {

    return (
        <>

            <UserProvider>
                <div className="md:w-[60%] ">
                    <Posts />
                </div>
            </UserProvider>

        </>
    )
}

export default Home