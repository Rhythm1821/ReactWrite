import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import Profile from './pages/Profile'
import { UserProvider } from './contexts/UserContext'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'

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
          <Route path='/profile/:id' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path='/post/edit/:id' element={<ProtectedRoutes><EditPost /></ProtectedRoutes>} />
          <Route path='/post/:id' element={<ProtectedRoutes><PostDetail /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App
