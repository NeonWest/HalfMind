import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate()

    const logout = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            method: "POST",
            credentials: "include",
        })

        // After the backend deletes the cookie,
        // send the user back to the login page.
        navigate("/login")
    }

    return (
        <button onClick={logout}>
            Log out
        </button>
    )
}

export default Logout