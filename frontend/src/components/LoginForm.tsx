import { useState, type FormEvent } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./LoginForm.css"

const LoginForm = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/login`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        )

        const data = await response.json()

        console.log(data.message)

        if (!response.ok) {
            return
        }

        // Login succeeded and the backend created the cookie.
        // Now ask the backend for the logged-in user's information.
        const meResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/me`,
            {
                credentials: "include",
            }
        )

        if (!meResponse.ok) {
            return
        }

        const user = await meResponse.json()

        // Update the shared authentication state.
        setUser(user)
        navigate("/app")
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
                <label htmlFor="email">Email</label>

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="login-form-group">
                <label htmlFor="password">Password</label>

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit">
                Log in
            </button>
        </form>
    )
}

export default LoginForm