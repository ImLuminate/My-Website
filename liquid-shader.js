import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

const container = document.body;

// --- use the viewport (prevents CSS scaling/stretch) ---
let width = window.innerWidth;
let height = window.innerHeight;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Scene and orthographic camera for full-screen quad
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

// Uniforms (unchanged names/values)
const uniforms = {
  u_time: { value: 10.0 },
  u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
  u_resolution: { value: new THREE.Vector2(width, height) },
  u_colorA: { value: new THREE.Color(0.25, 0.25, 0.25) },
  u_colorB: { value: new THREE.Color(0.0, 0.0, 0.0) },
  u_dominance: { value: 1.0 }
};

// Shaders (identical style; only aspect math changed)
const vertexShader = `
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;
  uniform float u_dominance;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;

  float hash(vec2 p) {
    return fract(sin(dot(p ,vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      total += amplitude * noise(p);
      p *= 1.6;
      amplitude *= 0.5;
    }
    return total;
  }

void main(){
  float s = min(u_resolution.x, u_resolution.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / s + 0.5;

  vec2 offset = u_mouse * 0.1;

  float arYoverX = u_resolution.y / u_resolution.x; // >1 in portrait
  float boost = mix(1.0, 1.5, smoothstep(1.0, 2.2, arYoverX));

  float zoom = 10.0;

  if (u_resolution.y > u_resolution.x) {
      zoom *= 0.3;  // increase this number for more zoom on phones
  }

  uv = uv * zoom + offset;

  float n = fbm(uv + vec2(u_time * 0.002, u_time * 0.001));
  float contour = mod(n * 6.0 + u_time * 0.5, 1.0);
  float intensity = 1.0 - smoothstep(0.015, 0.05, contour);

  vec3 color = u_colorA;
  float alpha = intensity * pow(v_uv.y, 1.5);
  gl_FragColor = vec4(color, alpha);
}
`;

// Fullscreen quad
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  transparent: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Handle resizes using the viewport
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setSize(width, height);
  uniforms.u_resolution.value.set(width, height);
});

// Mouse (same mapping you had)
container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  uniforms.u_mouse.value.x = ((e.clientX - rect.left) / rect.width - 0.5) * 1.5;
  uniforms.u_mouse.value.y = ((e.clientY - rect.top) / rect.height - 0.5) * 1.5;
});

// Animate
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value = clock.getElapsedTime() * 0.4;
  renderer.render(scene, camera);
}
animate();
