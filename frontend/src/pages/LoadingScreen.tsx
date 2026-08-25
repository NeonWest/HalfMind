import { useRef } from "react";
import "./LoadingScreen.css";
import { useLoadingShaderBackground } from "./loadingShaderBackground";

export default function LoadingScreen() {
    // Reference to the canvas that will contain
    // our animated WebGL background.
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Start the shader background.
    //
    // The hook handles:
    // - WebGL setup
    // - animation
    // - resizing
    // - cleanup
    useLoadingShaderBackground(canvasRef);

    return (
        <div className="loading-screen">
            {/* Animated WebGL background */}
            <canvas
                ref={canvasRef}
                className="loading-screen__canvas"
                aria-hidden="true"
            />

            {/* Content displayed above the background */}
            <main className="loading-screen__content">
                <h1 className="loading-screen__title">
                    HalfMind
                </h1>

                <p className="loading-screen__subtitle">
                    Syncing fragments...
                </p>
            </main>
        </div>
    );
}