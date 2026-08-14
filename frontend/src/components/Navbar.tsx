import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">HalfMind</Link>
            <div className="navbar-actions">
                <Link to="/login" className="navbar-login">Log In</Link>
                <Link to="/register" className="navbar-register">Get Started!</Link>
            </div>
        </nav>
    )
}

export default Navbar;