import { useState, type FormEvent } from "react"
import "./LoginForm.css"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        )

        console.log(response.status)
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