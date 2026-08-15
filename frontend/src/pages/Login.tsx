import LoginForm from "../components/LoginForm"
import "./Login.css"

const Login = () => {
    return (
        <main className="login-page">
            <div className="login-background" />

            <header className="login-header">
                <a href="/" className="login-brand">
                    HalfMind
                </a>

                <span className="login-index">
                    02 / ACCOUNT
                </span>
            </header>

            <section className="login-content">
                <div className="login-intro">
                    <span className="login-label">
                        Welcome back
                    </span>

                    <h1>
                        Pick up<br />
                        where you left off.
                    </h1>

                    <p>
                        Your thoughts are still here.
                        Sign in to continue.
                    </p>
                </div>

                <div className="login-form-wrapper">
                    <LoginForm />

                    <p className="login-register">
                        Don't have an account?
                        <a href="/register">Create one</a>
                    </p>
                </div>
            </section>

            <footer className="login-footer">
                <span>HALFMIND</span>
                <span>NOTES THAT FORGET, SO YOU DON'T HAVE TO.</span>
            </footer>
        </main>
    )
}

export default Login