import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-brand">
                HalfMind v0.1
            </div>

            <div className="footer-links">
                <a
                    href="https://github.com/NeonWest/HalfMind"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>

                <Link to="/docs">
                    Documentation
                </Link>

                <Link to="/changelog">
                    Changelog
                </Link>
            </div>

            <div className="footer-meta">
                HalfMind Open Source · MIT License
            </div>
        </footer>
    );
};

export default Footer;