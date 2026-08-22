import { Navigate } from 'react-router-dom'

// Props that ProtectedRoute needs:
// - user: the currently authenticated user, or null if nobody is logged in
// - children: the page/component we want to protect
type ProtectedRouteProps = {
    user: any
    children: React.ReactNode
}

// Protects a React page from unauthenticated users.
function ProtectedRoute({ user, children }: ProtectedRouteProps) {

    // If there is no authenticated user,
    // redirect them to the login page instead of showing the protected page.
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // If the user is authenticated,
    // render the protected page/component.
    return children
}

export default ProtectedRoute