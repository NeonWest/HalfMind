import {
    useEffect,
    type RefObject,
} from "react";

import {
    vertexShaderSource,
    fragmentShaderSource,
} from "./loadingShader";

/**
 * Compiles a single WebGL shader.
 *
 * WebGL needs two shaders:
 * 1. Vertex shader   → positions our canvas
 * 2. Fragment shader → creates the actual visual effect
 */
function createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
): WebGLShader | null {
    const shader = gl.createShader(type);

    if (!shader) {
        return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // Check whether the shader compiled successfully.
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
            "Shader compilation error:",
            gl.getShaderInfoLog(shader)
        );

        gl.deleteShader(shader);

        return null;
    }

    return shader;
}


/**
 * Connects our WebGL shader background to a canvas.
 *
 * The LoadingScreen component gives this function a reference
 * to its <canvas> element.
 *
 * The shader then runs continuously using requestAnimationFrame.
 */
export function useLoadingShaderBackground(
    canvasRef: RefObject<HTMLCanvasElement | null>
) {
    useEffect(() => {
        const canvas = canvasRef.current;

        // Make sure the canvas exists.
        if (!canvas) {
            return;
        }

        // Ask the browser for a WebGL rendering context.
        const gl = canvas.getContext("webgl");

        // Some browsers/devices may not support WebGL.
        if (!gl) {
            console.warn(
                "WebGL is not supported by this browser."
            );

            return;
        }


        // --------------------------------------------------
        // CREATE SHADERS
        // --------------------------------------------------

        const vertexShader = createShader(
            gl,
            gl.VERTEX_SHADER,
            vertexShaderSource
        );

        const fragmentShader = createShader(
            gl,
            gl.FRAGMENT_SHADER,
            fragmentShaderSource
        );

        // Stop if either shader failed to compile.
        if (!vertexShader || !fragmentShader) {
            return;
        }


        // --------------------------------------------------
        // CREATE SHADER PROGRAM
        // --------------------------------------------------

        // A WebGL program combines the vertex shader
        // and fragment shader together.
        const shaderProgram = gl.createProgram();

        if (!shaderProgram) {
            return;
        }

        gl.attachShader(
            shaderProgram,
            vertexShader
        );

        gl.attachShader(
            shaderProgram,
            fragmentShader
        );

        gl.linkProgram(shaderProgram);


        // Check whether the two shaders linked successfully.
        if (
            !gl.getProgramParameter(
                shaderProgram,
                gl.LINK_STATUS
            )
        ) {
            console.error(
                "Unable to initialize shader program:",
                gl.getProgramInfoLog(shaderProgram)
            );

            return;
        }


        // --------------------------------------------------
        // FIND SHADER VARIABLES
        // --------------------------------------------------

        // The vertex shader expects a position for
        // each point of our full-screen rectangle.
        const positionAttribute =
            gl.getAttribLocation(
                shaderProgram,
                "aVertexPosition"
            );

        // The fragment shader uses time to animate
        // the fragments.
        const timeUniform =
            gl.getUniformLocation(
                shaderProgram,
                "uTime"
            );

        // The fragment shader needs the canvas size
        // to keep the effect looking correct on
        // different screen sizes.
        const resolutionUniform =
            gl.getUniformLocation(
                shaderProgram,
                "uResolution"
            );


        // --------------------------------------------------
        // CREATE FULL-SCREEN RECTANGLE
        // --------------------------------------------------

        // These four points cover the entire canvas.
        //
        // WebGL coordinates go from -1 to +1.
        const positions = new Float32Array([
            1, 1,
            -1, 1,
            1, -1,
            -1, -1,
        ]);

        const positionBuffer =
            gl.createBuffer();

        if (!positionBuffer) {
            return;
        }

        // Send the rectangle's positions to the GPU.
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            positionBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            positions,
            gl.STATIC_DRAW
        );


        // --------------------------------------------------
        // RESIZE CANVAS
        // --------------------------------------------------

        const resizeCanvas = () => {
            // Device pixel ratio makes the shader sharper
            // on Retina/high-resolution displays.
            //
            // We cap it at 2 so extremely high-DPI screens
            // don't unnecessarily hurt performance.
            const pixelRatio = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            const width = Math.floor(
                canvas.clientWidth * pixelRatio
            );

            const height = Math.floor(
                canvas.clientHeight * pixelRatio
            );

            if (
                canvas.width !== width ||
                canvas.height !== height
            ) {
                canvas.width = width;
                canvas.height = height;
            }
        };


        // --------------------------------------------------
        // ANIMATION LOOP
        // --------------------------------------------------

        let animationFrameId = 0;

        const render = (time: number) => {
            resizeCanvas();

            // Tell WebGL what part of the canvas
            // we want to draw into.
            gl.viewport(
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Set the background color.
            gl.clearColor(
                0.0588,
                0.0549,
                0.0549,
                1
            );

            gl.clear(
                gl.COLOR_BUFFER_BIT
            );


            // Use our shader program.
            gl.useProgram(
                shaderProgram
            );


            // Give WebGL our rectangle.
            gl.bindBuffer(
                gl.ARRAY_BUFFER,
                positionBuffer
            );

            gl.vertexAttribPointer(
                positionAttribute,
                2,
                gl.FLOAT,
                false,
                0,
                0
            );

            gl.enableVertexAttribArray(
                positionAttribute
            );


            // Send the current time to the shader.
            //
            // The shader uses this value to move
            // and pulse the fragments.
            gl.uniform1f(
                timeUniform,
                time * 0.001
            );


            // Send the current canvas dimensions
            // to the shader.
            gl.uniform2f(
                resolutionUniform,
                canvas.width,
                canvas.height
            );


            // Draw the full-screen rectangle.
            //
            // The fragment shader then calculates
            // the appearance of every pixel.
            gl.drawArrays(
                gl.TRIANGLE_STRIP,
                0,
                4
            );


            // Ask the browser to render the next frame.
            animationFrameId =
                requestAnimationFrame(
                    render
                );
        };


        // Set the initial size before starting.
        resizeCanvas();

        // Start the animation.
        animationFrameId =
            requestAnimationFrame(
                render
            );


        // --------------------------------------------------
        // CLEANUP
        // --------------------------------------------------

        // React calls this when LoadingScreen disappears.
        //
        // This is important because we don't want the
        // animation continuing in the background.
        return () => {
            cancelAnimationFrame(
                animationFrameId
            );

            gl.deleteBuffer(
                positionBuffer
            );

            gl.deleteProgram(
                shaderProgram
            );

            gl.deleteShader(
                vertexShader
            );

            gl.deleteShader(
                fragmentShader
            );
        };
    }, []);
}