import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Logout() {

    const navigate = useNavigate()
    const { setUser } = useAuth()

    const logout = async () => {

        // TODO: Handle logout request failure before clearing local auth state.

        await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            method: "POST",
            credentials: "include",
        })

        // Tell React that the user is no longer authenticated.
        setUser(null)

        // Send the user back to the landing page.
        navigate("/")
    }

    return (
        <button onClick={logout}>
            Log out
        </button>
    )
}

export default Logout