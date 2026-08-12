import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to our landing page</h1>
            <Link to="/register">
                CLICK HERE TO REGISTER!
            </Link>
        </div>
    )
}

export default LandingPage;