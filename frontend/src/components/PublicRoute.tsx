import { Navigate } from 'react-router-dom'

// Props that PublicRoute needs:
// - user: the currently authenticated user, or null if nobody is logged in
// - children: the page/component we want to show to unauthenticated users
type PublicRouteProps = {
    user: any
    children: React.ReactNode
}

// Prevents authenticated users from accessing pages like Login and Register.
function PublicRoute({ user, children }: PublicRouteProps) {

    // If a user is already authenticated,
    // redirect them to the app instead of showing the public page.
    if (user) {
        return <Navigate to="/app" replace />
    }

    // If there is no authenticated user,
    // show the requested public page.
    return children
}

export default PublicRoute