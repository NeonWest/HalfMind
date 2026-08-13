import { useState, type FormEvent } from 'react'
import './RegisterForm.css'
const RegisterForm = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })

        })
        console.log(response.status)

    }



    return (
        < form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username!"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email!"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password!"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit">Create Account!</button>
        </form >

    )

}

export default RegisterForm