import RegisterForm from "../components/RegisterForm"
import "./Register.css"

const Register = () => {
    return (
        <main className="register-page">
            <div className="register-background" />

            <header className="register-header">
                <a href="/" className="register-brand">
                    HalfMind
                </a>

                <span className="register-index">
                    01 / ACCOUNT
                </span>
            </header>

            <section className="register-content">
                <div className="register-intro">
                    <span className="register-label">
                        Create account
                    </span>

                    <h1>
                        A place for<br />
                        your thoughts.
                    </h1>

                    <p>
                        Create your HalfMind account and start
                        keeping the things worth remembering.
                    </p>
                </div>

                <div className="register-form-wrapper">
                    <RegisterForm />

                    <p className="register-login">
                        Already have an account?
                        <a href="/login">Log in</a>
                    </p>
                </div>
            </section>

            <footer className="register-footer">
                <span>HALFMIND</span>
                <span>NOTES THAT FORGET, SO YOU DON'T HAVE TO.</span>
            </footer>
        </main>
    )
}

export default Register