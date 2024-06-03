import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../api";


export default function UserAccount() {
    const [userAccount, setUserAccount] = useState({});
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (user && user.id) {
            api.get(`users/${user.id}/`)
                .then(res => setUserAccount(res.data))
                .catch(err => console.log(err));
        }
    })

    if (loading) return <div>Loading...</div>;
    console.log("userAccount", userAccount);

    return (
        <>
            <h1>User Account</h1>
            <h1>Hello {user?.username}</h1>
            {/* <h3>{JSON.stringify(userAccount)}</h3> */}
            <h2>Username: {userAccount.username}</h2>
            <h2>Email: {userAccount.email}</h2>
        </>
    );

}


// export default function About() {
//     const [userAccount, setUserAccount] = useState(null);
//     const { user, loading } = useContext(UserContext);
//     const { isAuthenticated } = useAuth();

//     useEffect(() => {
//         if (user && user.id) {
//             api.get(`users/${user.id}/`)
//                 .then(res => setUserAccount(res.data))
//                 .catch(err => console.log(err));
//         }
//     }, [user]);

//     if (loading) return <div>Loading...</div>;

//     return (
//         <>
//             <h1>About</h1>
//             <h1>Hello {user?.username}</h1>
//             <h1>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</h1>
//             <h3>{JSON.stringify(userAccount)}</h3>
//         </>
//     );
// }
