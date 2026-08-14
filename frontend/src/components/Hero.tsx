import { Link } from "react-router-dom";
import "./Hero.css"
const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-meta hero-meta-left">
                [SYS_INIT: OK]
                <br />
                &gt; loading context...
                <br />
                &gt; state: volatile
            </div>

            <div className="hero-meta hero-meta-right">
                mem_alloc: 1024kb
                <br />
                ctrl + cmd + h
            </div>
            <p className="hero-label">[ Your Second Brain ]</p>

            <h1 className="hero-title">
                Notes that forget,
                <br />
                so you don't have to.
            </h1>

            <p className="hero-description">
                Capture what matters. Let HalfMind handle the remembering.
            </p>

            <div className="hero-actions">
                <Link to="/register" className="hero-primary">Start Free</Link>

                <a href="https://github.com/NeonWest/HalfMind" className="hero-secondary"
                    target="_blank" rel="noopener noreferrer"> View on GitHub </a>
            </div>

        </section>
    )
}

export default Hero;