import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import AppHome from './pages/AppHome'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'


function App() {

  // Stores the currently authenticated user.
  // null means that we don't currently have an authenticated user.
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Runs once when the React app starts.
  // We use this to ask the backend who is currently logged in.
  useEffect(() => {

    // Request the current user from the backend.
    // credentials: 'include' tells the browser to send cookies.
    fetch(`${import.meta.env.VITE_API_URL}/me`, {
      credentials: 'include',
    })

      // Check whether the backend accepted the request.
      .then(response => {

        // If the backend returned an error such as 401,
        // the user is not authenticated.
        if (!response.ok) {
          throw new Error('Not authenticated')
        }

        // Convert the backend's JSON response into a JavaScript object.
        return response.json()
      })

      // If authentication succeeded,
      // store the returned user in React state.
      .then(data => {

        setUser(data)

      })

      // If authentication failed,
      // make sure user remains null.
      .catch(() => {

        setUser(null)

      })


      .finally(() => {
        setLoading(false)
      })

    // Empty dependency array means this runs once
    // when the App component first loads.
  }, [])

  if (loading) {
    return <div>wait a bit guys</div>
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

        {/* Currently our app page.
            We will protect this route with ProtectedRoute. */}
        <Route path='/app' element={<ProtectedRoute user={user}><AppHome /></ProtectedRoute>} />

      </Routes>

    </BrowserRouter>

  )
}

export default App