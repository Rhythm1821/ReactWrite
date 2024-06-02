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
import ProfileUpdate from './pages/ProfileUpdate'
import Navbar from './components/Navbar'
import CreatePost from './pages/CreatePost'
import Contact from './pages/Contact'
import About from './pages/About'

function App() {

  const Logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/home' element={<Navigate to={'/'} />} />
          <Route path='/create' element={<ProtectedRoutes><CreatePost /></ProtectedRoutes>} />
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} /> 
          <Route path='/logout' element={<Logout />} />
          <Route path='/contact' element={<ProtectedRoutes><Contact /></ProtectedRoutes>} />
          <Route path='/about' element={<ProtectedRoutes><About /></ProtectedRoutes>} />
          <Route path='/profile/:id' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path='/profile/edit' element={<ProtectedRoutes><ProfileUpdate /></ProtectedRoutes>} />
          <Route path='/post/edit/:id' element={<ProtectedRoutes><EditPost /></ProtectedRoutes>} />
          <Route path='/post/:id' element={<ProtectedRoutes><PostDetail /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
