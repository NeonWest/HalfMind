import { createContext, useContext, useEffect, useState } from "react"

// Shared authentication state for the whole React application.
const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

    // The currently logged-in user.
    // null means nobody is logged in.
    const [user, setUser] = useState(null)

    // True while we are checking /me.
    const [loading, setLoading] = useState(true)

    // When the React app starts, ask the backend
    // who is currently logged in.
    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/me`, {
            // Tell the browser to include the authentication cookie.
            credentials: "include",
        })

            // Check the backend response.
            .then(response => {

                // 401 means there is no valid logged-in user.
                if (!response.ok) {
                    throw new Error("Not authenticated")
                }

                // Convert the response into a JavaScript object.
                return response.json()
            })

            // Authentication succeeded.
            .then(data => {
                setUser(data)
            })

            // Authentication failed.
            .catch(() => {
                setUser(null)
            })

            // Whether authentication succeeded or failed,
            // we are finished checking.
            .finally(() => {
                setLoading(false)
            })

    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// Allows any component inside AuthProvider
// to access the shared authentication state.
export function useAuth() {
    return useContext(AuthContext)
}