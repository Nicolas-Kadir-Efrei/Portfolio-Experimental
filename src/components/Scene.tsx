 "use client";
 
 import { Canvas, useFrame, useThree } from "@react-three/fiber";
 import { Environment, Stars } from "@react-three/drei";
 import { useMemo, useRef } from "react";
 import * as THREE from "three";
 
 function NebulaDome() {
   const mat = useRef<THREE.ShaderMaterial>(null);
 
   const shader = useMemo(() => {
     const uniforms = {
       uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#a78bfa") }, // violet
      uColorB: { value: new THREE.Color("#22d3ee") }, // cyan
      uColorC: { value: new THREE.Color("#070816") }, // deep space
      uColorD: { value: new THREE.Color("#fb7185") }, // rose
      uColorE: { value: new THREE.Color("#ef4444") }, // red
     };
 
     // Lightweight 2D fbm (good enough for a nebula look)
     const vertexShader = /* glsl */ `
       varying vec3 vPos;
       void main() {
         vPos = position;
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
       }
     `;
 
     const fragmentShader = /* glsl */ `
       precision highp float;
       uniform float uTime;
       uniform vec3 uColorA;
       uniform vec3 uColorB;
       uniform vec3 uColorC;
      uniform vec3 uColorD;
      uniform vec3 uColorE;
       varying vec3 vPos;
 
       float hash(vec2 p) {
         p = fract(p * vec2(123.34, 345.45));
         p += dot(p, p + 34.345);
         return fract(p.x * p.y);
       }
 
       float noise(vec2 p) {
         vec2 i = floor(p);
         vec2 f = fract(p);
         float a = hash(i);
         float b = hash(i + vec2(1.0, 0.0));
         float c = hash(i + vec2(0.0, 1.0));
         float d = hash(i + vec2(1.0, 1.0));
         vec2 u = f * f * (3.0 - 2.0 * f);
         return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
       }
 
       float fbm(vec2 p) {
         float v = 0.0;
         float a = 0.5;
         mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
         for (int i = 0; i < 5; i++) {
           v += a * noise(p);
           p = m * p;
           a *= 0.5;
         }
         return v;
       }
 
       void main() {
         // Map sphere position to UV-ish coords
         vec3 p = normalize(vPos);
         float t = uTime * 0.03;
         vec2 uv = vec2(atan(p.z, p.x) / 6.2831853 + 0.5, asin(p.y) / 3.1415926 + 0.5);
 
         // Flow field
         vec2 q = uv * 3.2;
         q += vec2(t, -t * 0.6);
         float n1 = fbm(q + fbm(q * 1.7 + 3.1));
         float n2 = fbm(q * 1.3 - vec2(2.0, 1.0) + n1);
 
         float neb = smoothstep(0.35, 0.92, n1) * 0.9 + smoothstep(0.45, 0.95, n2) * 0.65;
         neb *= 0.9 + 0.1 * sin(uTime * 0.25 + n2 * 6.0);
 
         // Dark dust lanes
         float dust = fbm(q * 2.3 + 10.0);
         float lanes = smoothstep(0.35, 0.62, dust);
         neb *= 1.0 - lanes * 0.35;
 
        // Color palette: cyan/violet base + rose/red accents in denser areas
        float palette = clamp(n2 * 1.05, 0.0, 1.0);
        vec3 base = mix(uColorB, uColorA, palette);
        float hot = smoothstep(0.62, 0.98, n1) * smoothstep(0.45, 0.9, n2);
        vec3 accent = mix(uColorD, uColorE, smoothstep(0.35, 0.95, n2));
        vec3 col = mix(uColorC, base, neb);
        col = mix(col, accent, hot * 0.55);
        col += 0.11 * uColorA * pow(neb, 2.2);
        col += 0.08 * uColorD * pow(hot, 1.6);
 
         // Vignette to keep focus centered
         float v = smoothstep(0.95, 0.25, distance(uv, vec2(0.5, 0.5)));
         col *= 0.85 + 0.25 * v;
 
         gl_FragColor = vec4(col, 1.0);
       }
     `;
 
     return { uniforms, vertexShader, fragmentShader };
   }, []);
 
   useFrame(({ clock }) => {
     if (mat.current) mat.current.uniforms.uTime.value = clock.getElapsedTime();
   });
 
   return (
     <mesh>
      {/* Dome must be larger than starfield so it doesn't occlude stars */}
      <sphereGeometry args={[80, 64, 64]} />
       <shaderMaterial
         ref={mat}
         uniforms={shader.uniforms}
         vertexShader={shader.vertexShader}
         fragmentShader={shader.fragmentShader}
         side={THREE.BackSide}
       />
     </mesh>
   );
 }
 
 function makeNebulaTexture(seed: number) {
   const canvas = document.createElement("canvas");
   canvas.width = 1024;
   canvas.height = 1024;
   const ctx = canvas.getContext("2d");
   if (!ctx) return null;
 
   // deterministic-ish RNG (tiny LCG)
   let s = Math.max(1, Math.floor(seed));
   const rnd = () => {
     s = (s * 48271) % 0x7fffffff;
     return s / 0x7fffffff;
   };
 
   ctx.clearRect(0, 0, canvas.width, canvas.height);
 
   const bg = ctx.createRadialGradient(512, 512, 0, 512, 512, 640);
   bg.addColorStop(0, "rgba(255,255,255,0.06)");
   bg.addColorStop(1, "rgba(0,0,0,0)");
   ctx.fillStyle = bg;
   ctx.fillRect(0, 0, canvas.width, canvas.height);
 
   // Layered "gas" blobs (less saturated = more NASA)
   const blobCount = 22;
   for (let i = 0; i < blobCount; i++) {
     const x = rnd() * 1024;
     const y = rnd() * 1024;
     const r = 240 + rnd() * 420;
     const hue = 195 + rnd() * 75; // cyan -> violet (cooler)
     const alpha = 0.03 + rnd() * 0.06;
 
     const g = ctx.createRadialGradient(x, y, 0, x, y, r);
     g.addColorStop(0, `hsla(${hue}, 55%, 70%, ${alpha})`);
     g.addColorStop(0.62, `hsla(${hue + 6}, 50%, 52%, ${alpha * 0.55})`);
     g.addColorStop(1, "rgba(0,0,0,0)");
 
     ctx.globalCompositeOperation = "screen";
     ctx.fillStyle = g;
     ctx.beginPath();
     ctx.arc(x, y, r, 0, Math.PI * 2);
     ctx.fill();
   }
 
   // Fine dust (very subtle)
   ctx.globalCompositeOperation = "lighter";
   for (let i = 0; i < 11000; i++) {
     const x = rnd() * 1024;
     const y = rnd() * 1024;
     const a = rnd() * 0.035;
     ctx.fillStyle = `rgba(255,255,255,${a})`;
     ctx.fillRect(x, y, 1, 1);
   }
 
   const tex = new THREE.CanvasTexture(canvas);
   tex.colorSpace = THREE.SRGBColorSpace;
   tex.wrapS = THREE.ClampToEdgeWrapping;
   tex.wrapT = THREE.ClampToEdgeWrapping;
   tex.minFilter = THREE.LinearMipmapLinearFilter;
   tex.magFilter = THREE.LinearFilter;
   tex.needsUpdate = true;
   return tex;
 }
 
 function NebulaGalaxy({
   starCount = 2200,
   dustCount = 1400,
 }: {
   starCount?: number;
   dustCount?: number;
 }) {
   const group = useRef<THREE.Group>(null);
   const dustRef = useRef<THREE.Points>(null);
   const starsRef = useRef<THREE.Points>(null);
  const twinkleRef = useRef<THREE.Points>(null);
 
  const { starsGeom, twinkleGeom, dustGeom, sprite } = useMemo(() => {
    // Circular sprite to avoid "square/cube" particles
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(255,255,255,0.7)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    }
    const spriteTex = new THREE.CanvasTexture(c);
    spriteTex.colorSpace = THREE.SRGBColorSpace;
    spriteTex.minFilter = THREE.LinearMipmapLinearFilter;
    spriteTex.magFilter = THREE.LinearFilter;
    spriteTex.needsUpdate = true;

     // Stars
     const starsPos = new Float32Array(starCount * 3);
     for (let i = 0; i < starCount; i++) {
       const i3 = i * 3;
       const u = Math.random();
       const v = Math.random();
       const theta = u * Math.PI * 2;
       const phi = Math.acos(2 * v - 1);
       const r = 12 + Math.random() * 18;
       starsPos[i3 + 0] = r * Math.sin(phi) * Math.cos(theta);
       starsPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
       starsPos[i3 + 2] = r * Math.cos(phi);
     }
     const sg = new THREE.BufferGeometry();
     sg.setAttribute("position", new THREE.BufferAttribute(starsPos, 3));
 
     // Dust (more natural / desaturated)
     const dustPos = new Float32Array(dustCount * 3);
     const dustCol = new Float32Array(dustCount * 3);
     const c1 = new THREE.Color("#22d3ee"); // cyan
     const c2 = new THREE.Color("#a78bfa"); // violet
     const c3 = new THREE.Color("#fb7185"); // rose
     const c4 = new THREE.Color("#ef4444"); // red (rare)
     for (let i = 0; i < dustCount; i++) {
       const i3 = i * 3;
       const a = Math.random() * Math.PI * 2;
       const rr = 3.2 + Math.pow(Math.random(), 0.6) * 7.8;
       const z = (Math.random() - 0.5) * 5.0;
       const x = Math.cos(a) * rr;
       const y = Math.sin(a) * rr;
       dustPos[i3 + 0] = x;
       dustPos[i3 + 1] = y;
       dustPos[i3 + 2] = z;
 
       const mix = (Math.sin(a * 2.0) + 1) * 0.5;
       const col = c1
         .clone()
         .lerp(c2, mix)
         .lerp(c3, Math.random() * 0.22)
         .lerp(c4, Math.pow(Math.random(), 4.0) * 0.35);
       dustCol[i3 + 0] = col.r;
       dustCol[i3 + 1] = col.g;
       dustCol[i3 + 2] = col.b;
     }
     const dg = new THREE.BufferGeometry();
     dg.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    // Keep dust neutral to prevent colored "blocks"
    // (nebula provides the color; stars should stay white)
 
     // Brighter sparse stars (for twinkle)
     const tCount = Math.max(300, Math.floor(starCount * 0.18));
     const tPos = new Float32Array(tCount * 3);
     for (let i = 0; i < tCount; i++) {
       const i3 = i * 3;
       const u = Math.random();
       const v = Math.random();
       const theta = u * Math.PI * 2;
       const phi = Math.acos(2 * v - 1);
       const r = 10 + Math.random() * 16;
       tPos[i3 + 0] = r * Math.sin(phi) * Math.cos(theta);
       tPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
       tPos[i3 + 2] = r * Math.cos(phi);
     }
     const tg = new THREE.BufferGeometry();
     tg.setAttribute("position", new THREE.BufferAttribute(tPos, 3));

     return {
       starsGeom: sg,
       twinkleGeom: tg,
       dustGeom: dg,
      sprite: spriteTex,
     };
   }, [starCount, dustCount]);
 
   useFrame(({ clock }) => {
     const t = clock.getElapsedTime();
     if (group.current) {
       group.current.rotation.y = t * 0.03;
       group.current.rotation.x = Math.sin(t * 0.11) * 0.03;
     }
     if (dustRef.current) dustRef.current.rotation.z = t * 0.05;
     if (starsRef.current) starsRef.current.rotation.y = t * 0.01;
    if (twinkleRef.current) {
      const m = twinkleRef.current.material as THREE.PointsMaterial;
      m.opacity = 0.55 + (Math.sin(t * 1.25) * 0.25 + Math.sin(t * 0.37) * 0.2);
      m.size = 0.03 + (Math.sin(t * 0.9) * 0.006 + 0.004);
    }
   });
 
   return (
     <group ref={group}>
       {/* Colored dust */}
       <points ref={dustRef} geometry={dustGeom}>
         <pointsMaterial
          map={sprite}
          size={0.028}
           sizeAttenuation
           transparent
          opacity={0.35}
           blending={THREE.AdditiveBlending}
           depthWrite={false}
          alphaTest={0.15}
          color="#ffffff"
         />
       </points>
 
       {/* Stars */}
       <points ref={starsRef} geometry={starsGeom}>
         <pointsMaterial
          map={sprite}
           size={0.02}
           sizeAttenuation
           transparent
           opacity={0.85}
           color="#ffffff"
           blending={THREE.AdditiveBlending}
           depthWrite={false}
          alphaTest={0.2}
         />
       </points>

       {/* Sparse bright stars with twinkle */}
       <points ref={twinkleRef} geometry={twinkleGeom}>
         <pointsMaterial
          map={sprite}
           size={0.03}
           sizeAttenuation
           transparent
           opacity={0.7}
           color="#ffffff"
           blending={THREE.AdditiveBlending}
           depthWrite={false}
          alphaTest={0.2}
         />
       </points>
     </group>
   );
 }
 
 function InfiniteDriftCamera() {
   const { camera, pointer } = useThree();
 
   useFrame(({ clock }) => {
     const t = clock.getElapsedTime();
     const px = pointer.x; // -1..1
     const py = pointer.y; // -1..1
 
     // base infinite drift
     const driftX = Math.sin(t * 0.15) * 0.18;
     const driftY = Math.cos(t * 0.12) * 0.12;
 
     // gentle parallax (still keeps motion when pointer is idle)
     const targetX = driftX + px * 0.22;
     const targetY = driftY + py * 0.14;
 
     camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
     camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
     camera.rotation.z = THREE.MathUtils.lerp(
       camera.rotation.z,
       Math.sin(t * 0.18) * 0.02 + px * 0.015,
       0.02
     );
     camera.lookAt(0, 0.15, 0);
   });
 
   return null;
 }
 
 export function Scene() {
   return (
     <div className="fixed inset-0 -z-10">
       <Canvas
         dpr={[1, 1.8]}
         camera={{ position: [0, 0, 4.2], fov: 50 }}
         gl={{ antialias: true, powerPreference: "high-performance" }}
       >
         <color attach="background" args={["#06060a"]} />
        {/* Fog was hiding far stars; keep it much farther */}
        <fog attach="fog" args={["#06060a", 20, 140]} />
 
        {/* Keep lights subtle to avoid "studio" look */}
        <ambientLight intensity={0.12} />
        <pointLight position={[0, 0.5, 1.5]} intensity={0.22} color="#ffffff" />
 
          <InfiniteDriftCamera />
        <NebulaDome />
        {/* Starfield comme au début (blanc, lisible) */}
        <Stars
          radius={30}
          depth={45}
          count={2800}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />
        <NebulaGalaxy />
 
        <Environment preset="night" />
       </Canvas>
     </div>
   );
 }
