import { useEffect, useRef } from 'react';

/**
 * Fullscreen WebGL fragment shader background.
 * Flowing aurora-style gradient tuned to the portfolio's navy + cyan palette.
 * Pure WebGL1 — no dependencies, mobile-friendly, respects prefers-reduced-motion.
 */
export function ShaderGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vertSrc = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    // Flowing simplex-ish noise via domain-warped sin fields.
    const fragSrc = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Cheap 2D hash + value noise
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for(int i = 0; i < 5; i++){
          v += a * noise(p);
          p *= 2.02;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
        float t = u_time * 0.08;

        // Domain warp for flowing aurora
        vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, -t)));
        vec2 r = vec2(
          fbm(uv + 1.5 * q + vec2(1.7, 9.2) + 0.15 * t),
          fbm(uv + 1.5 * q + vec2(8.3, 2.8) - 0.12 * t)
        );
        float f = fbm(uv + 1.8 * r);

        // Palette — deep navy base, cyan + electric blue accents, faint magenta highlight
        vec3 cBase   = vec3(0.035, 0.055, 0.105);  // hsl(210,30%,8%)
        vec3 cDeep   = vec3(0.05, 0.12, 0.22);
        vec3 cCyan   = vec3(0.20, 0.85, 0.95);
        vec3 cBlue   = vec3(0.25, 0.45, 0.95);
        vec3 cAccent = vec3(0.75, 0.30, 0.85);

        vec3 col = cBase;
        col = mix(col, cDeep,   smoothstep(0.15, 0.75, f));
        col = mix(col, cBlue,   smoothstep(0.45, 0.90, f) * 0.55);
        col = mix(col, cCyan,   smoothstep(0.60, 0.95, length(r)) * 0.45);
        col = mix(col, cAccent, smoothstep(0.80, 1.00, length(q)) * 0.18);

        // Subtle mouse-reactive glow
        float md = distance(uv, (u_mouse - 0.5 * u_res) / min(u_res.x, u_res.y));
        col += cCyan * 0.08 * smoothstep(0.6, 0.0, md);

        // Vignette
        float vig = smoothstep(1.2, 0.2, length(uv));
        col *= mix(0.55, 1.0, vig);

        // Grain
        float g = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.025;
        col += g;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, vertSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const onMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (rect.height - (e.clientY - rect.top)) * dpr;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    resize();

    const start = performance.now();
    let raf = 0;
    const render = () => {
      resize();
      const time = prefersReduced ? 0 : (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
