import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import Profile from './pages/Profile'
import { UserProvider } from './contexts/UserContext'

function App() {

  const Logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    return <Navigate to={'/login'} />
  }

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' 
          element={
          <ProtectedRoutes><Home /></ProtectedRoutes>
          } />
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} /> 
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App
