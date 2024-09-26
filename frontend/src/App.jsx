import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Profile from './pages/Profile';
import { UserProvider } from './contexts/UserContext';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import ProfileUpdate from './pages/ProfileUpdate';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Contact from './pages/Contact';
import About from './pages/About';
import UserAccount from './pages/UserAccount';
import React, { useEffect } from 'react';


function App() {

  const Logout = () => {
    useEffect(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.replace('/login');
    }, []);

    return null;
  };

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Navigate to={'/'} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path='/create' element={<CreatePost />} />
              <Route path='/my-account' element={<UserAccount />} />
              <Route path='/profile/edit' element={<ProfileUpdate />} />
              <Route path='/post/edit/:id' element={<EditPost />} />
            </Route>
            {/* User-specific routes */}
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/post/:id' element={<PostDetail />} />
          </Routes>
        </main>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
