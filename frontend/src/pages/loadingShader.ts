// Vertex shader
// Controls the position of the full-screen canvas.
// It creates a rectangle that covers the entire viewport.

export const vertexShaderSource = `
  attribute vec4 aVertexPosition;

  // Passes the position to the fragment shader.
  varying vec2 vTexCoord;

  void main() {
    gl_Position = aVertexPosition;

    // Convert the vertex position from -1..1
    // into texture coordinates from 0..1.
    vTexCoord = aVertexPosition.xy * 0.5 + 0.5;
  }
`;


// Fragment shader
// This is where the actual animated background is created.
// Every pixel on the canvas is calculated by this shader.

export const fragmentShaderSource = `
  precision highp float;

  varying vec2 vTexCoord;

  // Time is continuously updated by LoadingScreen.tsx.
  // This is what makes the background move.
  uniform float uTime;

  // Current canvas dimensions.
  // Used to keep the animation proportional
  // on different screen sizes.
  uniform vec2 uResolution;


  // Generates a repeatable pseudo-random number
  // from a 2D position.
  //
  // We use this to give each fragment slightly
  // different movement, position and size.
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);

    return fract(p.x * p.y);
  }


  void main() {

    // Current pixel position.
    vec2 uv = vTexCoord;

    // Move the coordinate system so that
    // the center of the screen is (0, 0).
    vec2 p = (uv - 0.5) * 2.0;

    // Correct for different screen aspect ratios.
    p.x *= uResolution.x / uResolution.y;


    // HalfMind's dark background color.
    vec3 backgroundColor = vec3(
      0.0588,
      0.0549,
      0.0549
    );


    // Stores the combined visibility/intensity
    // of all the animated fragments.
    float finalAlpha = 0.0;


    // Create 40 individual fragments.
    //
    // Each fragment gets its own:
    // - position
    // - size
    // - movement
    // - pulse
    for (float i = 0.0; i < 40.0; i++) {

      // Slowly rotate each fragment around
      // the center of the screen.
      float angle =
        i * 0.15 +
        uTime * 0.1;


      // Give every fragment a slightly
      // different distance from the center.
      float dist =
        hash(vec2(i, 123.0)) * 0.4 +
        0.3;


      // Calculate the fragment's position.
      vec2 center =
        vec2(
          cos(angle),
          sin(angle)
        ) * dist;


      // Give each fragment a slightly
      // different size.
      float size =
        hash(vec2(i, 456.0)) * 0.02 +
        0.005;


      // Make each fragment subtly pulse over time.
      size *=
        0.5 +
        0.5 * sin(uTime * 2.0 + i);


      // Calculate the horizontal shape of the fragment.
      float horizontal = smoothstep(
        size,
        size - 0.001,
        abs(p.x - center.x)
      );


      // Calculate the vertical shape of the fragment.
      float vertical = smoothstep(
        size * 2.0,
        size * 2.0 - 0.001,
        abs(p.y - center.y)
      );


      // Combine horizontal and vertical calculations
      // to create a small rectangular fragment.
      float fragment =
        horizontal *
        vertical;


      // Add this fragment to the final image.
      finalAlpha +=
        fragment *
        (0.3 + 0.2 * sin(uTime + i));
    }


    


    // Warm off-white color used by the fragments.
    vec3 fragmentColor = vec3(
      0.925,
      0.913,
      0.882
    );


    // Combine the animated fragments.
    float intensity =
      clamp(
        finalAlpha,
        0.0,
        1.0
      );


    // Blend the fragments into the dark background.
    vec3 color =
      mix(
        backgroundColor,
        fragmentColor,
        intensity
      );


    // Final color of the current pixel.
    gl_FragColor =
      vec4(color, 1.0);
  }
`;