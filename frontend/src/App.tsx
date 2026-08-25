import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import AppHome from './pages/AppHome'
import LoadingScreen from './pages/LoadingScreen'

import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

import { useAuth } from './context/AuthContext'


function App() {

  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>

      <Routes>

        {/* Landing page — only accessible when NOT logged in */}
        <Route
          path='/'
          element={
            <PublicRoute user={user}>
              <LandingPage />
            </PublicRoute>
          }
        />

        {/* Registration page — only accessible when NOT logged in */}
        <Route
          path='/register'
          element={
            <PublicRoute user={user}>
              <Register />
            </PublicRoute>
          }
        />

        {/* Login page — only accessible when NOT logged in */}
        <Route
          path='/login'
          element={
            <PublicRoute user={user}>
              <Login />
            </PublicRoute>
          }
        />

        {/* App page — only accessible when logged in */}
        <Route
          path='/app'
          element={
            <ProtectedRoute user={user}>
              <AppHome />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App