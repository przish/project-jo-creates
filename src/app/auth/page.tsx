'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AuthPage() {
  const [view, setView] = useState<'login' | 'signup'>('login');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WebGL Shader Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let resizeObserver: ResizeObserver | null = null;

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        // Create organic movement using time-shifted sine waves
        float noise = sin(uv.x * 3.0 + u_time * 0.5) * 0.5 + 0.5;
        noise += sin(uv.y * 4.0 - u_time * 0.3) * 0.3;
        
        // Define brand colors
        vec3 color1 = vec3(0.275, 0.518, 0.761); // #4684C2
        vec3 color2 = vec3(0.580, 0.737, 0.851); // #94BCD9
        vec3 color3 = vec3(0.812, 0.886, 0.945); // #CFE2F1
        
        // Mix colors based on noise and coordinates
        vec3 finalColor = mix(color1, color2, noise);
        finalColor = mix(finalColor, color3, uv.y * 0.5);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function createShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fs);
    const prog = gl.createProgram();
    
    if (prog && vertexShader && fragmentShader) {
      gl.attachShader(prog, vertexShader);
      gl.attachShader(prog, fragmentShader);
      gl.linkProgram(prog);
      gl.useProgram(prog);
      
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      
      const pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
      
      const uTime = gl.getUniformLocation(prog, 'u_time');
      const uRes = gl.getUniformLocation(prog, 'u_resolution');
      const uMouse = gl.getUniformLocation(prog, 'u_mouse');

      const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
      
      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        if (rect.width && rect.height) {
          const nx = (event.clientX - rect.left) / rect.width;
          const ny = 1.0 - (event.clientY - rect.top) / rect.height;
          mouse.x = nx * canvas.width;
          mouse.y = ny * canvas.height;
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      const render = (t: number) => {
        if (typeof ResizeObserver === 'undefined') syncSize();
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uTime) gl.uniform1f(uTime, t * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        
        animationFrameId = requestAnimationFrame(render);
      };
      
      render(0);

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (resizeObserver) resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <div className="bg-background font-body-md text-on-background min-h-[100dvh]">
      <main>
        <div className="flex flex-col w-full h-full min-h-[100dvh] md:flex-row bg-background">
          
          {/* Left Side: Branding & Shader */}
          <div className="relative w-full md:w-5/12 lg:w-1/2 flex flex-col justify-center items-center overflow-hidden bg-primary p-lg">
            <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen block">
              <canvas
                id="shader-canvas-ANIMATION_25"
                ref={canvasRef}
                className="block w-full h-full"
              />
            </div>
            <div className="relative z-10 w-full max-w-md text-on-primary">
              <div className="flex items-center gap-sm mb-xl">
                <svg
                  className="text-on-primary"
                  fill="none"
                  height="40"
                  viewBox="0 0 40 40"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0ZM20 36C11.1634 36 4 28.8366 4 20C4 11.1634 11.1634 4 20 4C28.8366 4 36 11.1634 36 20C36 28.8366 28.8366 36 20 36Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                  ></path>
                  <path
                    d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8ZM20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="font-headline-md text-headline-md tracking-tight">
                  Jo Creates
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-sm">
                Welcome to the<br />Creative Workspace
              </h1>
              <p className="font-body-lg text-body-lg text-on-primary/80 mb-xl max-w-sm">
                Manage commissions, track progress, and collaborate seamlessly in one
                unified platform.
              </p>
              <div className="relative w-64 h-64 mx-auto hidden md:block">
                <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96,-18,94.9,-3.1C93.8,11.8,86.1,26.1,75.4,37.6C64.7,49.1,51.1,57.7,37.3,66.1C23.5,74.5,9.5,82.7,-4.8,86.1C-19.1,89.5,-33.7,88.1,-46.4,81.3C-59.1,74.5,-69.9,62.3,-77.2,48.4C-84.5,34.5,-88.3,19,-88.6,3.6C-88.9,-11.8,-85.7,-27,-78.6,-40.5C-71.5,-54,-60.5,-65.8,-47.5,-73.4C-34.5,-81,-19.5,-84.4,-3.5,-78.4C12.5,-72.4,25.5,-59.5,44.7,-76.4Z"
                    fill="currentColor"
                    opacity="0.3"
                    transform="translate(100 100) scale(0.9)"
                  ></path>
                  <path
                    d="M37.9,-61.6C51.6,-53.4,66.7,-46.3,76.6,-34.5C86.5,-22.7,91.2,-6.2,87.6,8.6C84,23.4,72.1,36.5,60.1,47.9C48.1,59.3,36,69,21.9,74.3C7.8,79.6,-8.3,80.5,-23.4,76.1C-38.5,71.7,-52.6,62,-63.9,50.1C-75.2,38.2,-83.7,24.1,-86.3,9.2C-88.9,-5.7,-85.6,-21.4,-77.6,-34.3C-69.6,-47.2,-56.9,-57.3,-43.3,-65.4C-29.7,-73.5,-15.2,-79.6,-0.6,-78.6C14,-77.6,24.2,-69.8,37.9,-61.6Z"
                    fill="currentColor"
                    opacity="0.6"
                    transform="translate(100 100) scale(0.7)"
                  ></path>
                  <path
                    d="M25.4,-37.6C35.9,-30.9,49.2,-27.1,56.7,-18.9C64.2,-10.7,65.9,1.9,61.8,12.5C57.7,23.1,47.8,31.7,37.4,39.3C27,46.9,16.1,53.5,4.1,48.1C-7.9,42.7,-21.1,25.3,-32.1,11C-43.1,-3.3,-51.9,-14.5,-49.6,-23.5C-47.3,-32.5,-33.9,-39.3,-21.3,-45.5C-8.7,-51.7,3.1,-57.3,14.9,-44.3C25.4,-37.6,14.9,-44.3,25.4,-37.6Z"
                    fill="currentColor"
                    transform="translate(100 100) scale(0.8)"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side: Auth Forms */}
          <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center items-center bg-surface-container-lowest p-md md:p-lg min-h-screen">
            <div className="w-full max-w-[420px]" id="auth-container">
              
              {/* Login View */}
              {view === 'login' && (
                <div className="flex flex-col gap-md transition-opacity duration-300 opacity-100" id="view-login">
                  <div className="mb-sm">
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">
                      Sign In
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Welcome back! Please enter your details.
                    </p>
                  </div>
                  <form className="flex flex-col gap-md">
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-caps text-label-caps text-on-surface-variant uppercase"
                        htmlFor="email-login"
                      >
                        Email
                      </label>
                      <input
                        className="w-full bg-surface px-md py-sm rounded border border-[#CFE2F1] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                        id="email-login"
                        placeholder="Enter your email"
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <div className="flex justify-between items-center">
                        <label
                          className="font-label-caps text-label-caps text-on-surface-variant uppercase"
                          htmlFor="password-login"
                        >
                          Password
                        </label>
                        <a
                          className="font-body-md text-body-md text-primary hover:text-primary-container transition-colors text-sm"
                          href="#"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <input
                        className="w-full bg-surface px-md py-sm rounded border border-[#CFE2F1] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                        id="password-login"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                    <button
                      className="w-full bg-primary text-on-primary py-sm rounded font-body-md text-body-md font-medium hover:bg-surface-tint hover:shadow-lg transition-all duration-300 mt-sm"
                      type="button"
                    >
                      Sign In
                    </button>
                  </form>
                  <div className="flex items-center gap-md my-sm opacity-50">
                    <div className="h-px bg-outline-variant flex-1"></div>
                    <span className="font-body-md text-body-md text-on-surface-variant text-sm">
                      or
                    </span>
                    <div className="h-px bg-outline-variant flex-1"></div>
                  </div>
                  <div className="flex flex-col gap-sm">
                    <button className="w-full flex items-center justify-center gap-sm px-md py-sm border border-outline-variant rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-body-md text-body-md">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                      </svg>
                      Continue with Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-sm px-md py-sm border border-outline-variant rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-body-md text-body-md">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.688.827-1.35 2.272-1.155 3.65 1.35.104 2.61-.754 3.442-1.638z" fill="currentColor"></path>
                      </svg>
                      Continue with Apple
                    </button>
                  </div>
                  <p className="text-center font-body-md text-body-md text-on-surface-variant mt-sm">
                    Don't have an account?{' '}
                    <button
                      className="text-primary hover:text-primary-container font-medium transition-colors"
                      onClick={() => setView('signup')}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              )}

              {/* Signup View */}
              {view === 'signup' && (
                <div className="flex flex-col gap-md transition-opacity duration-300 opacity-100" id="view-signup">
                  <div className="mb-sm">
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">
                      Create an Account
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Join to start commissioning and tracking projects.
                    </p>
                  </div>
                  <form className="flex flex-col gap-md">
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-caps text-label-caps text-on-surface-variant uppercase"
                        htmlFor="name-signup"
                      >
                        Full Name
                      </label>
                      <input
                        className="w-full bg-surface px-md py-sm rounded border border-[#CFE2F1] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                        id="name-signup"
                        placeholder="Jane Doe"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-caps text-label-caps text-on-surface-variant uppercase"
                        htmlFor="email-signup"
                      >
                        Email
                      </label>
                      <input
                        className="w-full bg-surface px-md py-sm rounded border border-[#CFE2F1] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                        id="email-signup"
                        placeholder="jane@example.com"
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-caps text-label-caps text-on-surface-variant uppercase"
                        htmlFor="password-signup"
                      >
                        Password
                      </label>
                      <input
                        className="w-full bg-surface px-md py-sm rounded border border-[#CFE2F1] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                        id="password-signup"
                        placeholder="Create a password"
                        type="password"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-caps text-label-caps text-on-surface-variant uppercase"
                        htmlFor="confirm-password-signup"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="w-full bg-surface px-md py-sm rounded border border-[#CFE2F1] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                        id="confirm-password-signup"
                        placeholder="Confirm your password"
                        type="password"
                      />
                    </div>
                    <button
                      className="w-full bg-primary text-on-primary py-sm rounded font-body-md text-body-md font-medium hover:bg-surface-tint hover:shadow-lg transition-all duration-300 mt-sm"
                      type="button"
                    >
                      Create Account
                    </button>
                  </form>
                  <p className="text-center font-body-md text-body-md text-on-surface-variant mt-sm">
                    Already have an account?{' '}
                    <button
                      className="text-primary hover:text-primary-container font-medium transition-colors"
                      onClick={() => setView('login')}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}