/* Hero background: interconnected network nodes rendered on a single
   WebGL canvas — an abstract nod to distributed database architecture.
   Progressive enhancement only: the scene draws behind the static HTML
   and removes itself entirely when WebGL or the module fails. */

import * as THREE from '../vendor/three.module.min.js';

const canvas = document.getElementById('hero-canvas');
const hero = document.getElementById('top');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && hero && !reducedMotion) {
  try {
    initScene();
  } catch (e) {
    canvas.remove();
  }
}

function initScene() {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 26;

  const group = new THREE.Group();
  scene.add(group);

  /* ----- Network nodes ----- */
  const NODE_COUNT = window.innerWidth < 768 ? 60 : 110;
  const LINK_DISTANCE = 5.2;
  const nodePositions = new Float32Array(NODE_COUNT * 3);
  const nodeColors = new Float32Array(NODE_COUNT * 3);
  const colorA = new THREE.Color('#3B82F6');
  const colorB = new THREE.Color('#10B981');

  for (let i = 0; i < NODE_COUNT; i++) {
    /* Random point inside a flattened ellipsoid, denser toward the rim */
    const u = Math.random();
    const radius = 13 * Math.cbrt(0.25 + 0.75 * u);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    nodePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    nodePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.62;
    nodePositions[i * 3 + 2] = radius * Math.cos(phi) * 0.85;

    const mixed = colorA.clone().lerp(colorB, Math.random());
    nodeColors[i * 3] = mixed.r;
    nodeColors[i * 3 + 1] = mixed.g;
    nodeColors[i * 3 + 2] = mixed.b;
  }

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
  pointsGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

  const pointsMaterial = new THREE.PointsMaterial({
    size: 0.5,
    map: makeGlowSprite(),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true
  });
  group.add(new THREE.Points(pointsGeometry, pointsMaterial));

  /* ----- Links between nearby nodes ----- */
  const linkVertices = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = nodePositions[i * 3] - nodePositions[j * 3];
      const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
      const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DISTANCE) {
        linkVertices.push(
          nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
          nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]
        );
      }
    }
  }
  const linkGeometry = new THREE.BufferGeometry();
  linkGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linkVertices), 3));
  const linkMaterial = new THREE.LineBasicMaterial({ transparent: true, depthWrite: false });
  group.add(new THREE.LineSegments(linkGeometry, linkMaterial));

  /* ----- Outer wireframe shell ----- */
  const shellMaterial = new THREE.LineBasicMaterial({ transparent: true, depthWrite: false });
  const shell = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(14.5, 1)),
    shellMaterial
  );
  group.add(shell);

  /* ----- Theme-aware colors ----- */
  function applyTheme() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    pointsMaterial.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    pointsMaterial.opacity = light ? 0.55 : 0.9;
    linkMaterial.color.set(light ? '#2563EB' : '#3B82F6');
    linkMaterial.opacity = light ? 0.13 : 0.16;
    shellMaterial.color.set(light ? '#2563EB' : '#60A5FA');
    shellMaterial.opacity = light ? 0.07 : 0.07;
    pointsMaterial.needsUpdate = true;
  }
  applyTheme();
  new MutationObserver(applyTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  /* ----- Mouse-follow rotation (lerped for smoothness) ----- */
  let targetX = 0;
  let targetY = 0;
  let offsetX = 0;
  let offsetY = 0;
  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX / window.innerWidth - 0.5;
    targetY = event.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  /* ----- Sizing ----- */
  function resize() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  /* ----- Render loop: pause when the hero is offscreen or tab hidden ----- */
  const clock = new THREE.Clock();
  let baseRotation = 0;

  function frame() {
    const delta = Math.min(clock.getDelta(), 0.05);
    baseRotation += delta * 0.045;
    offsetX += (targetX - offsetX) * 0.04;
    offsetY += (targetY - offsetY) * 0.04;
    group.rotation.y = baseRotation + offsetX * 0.55;
    group.rotation.x = offsetY * 0.35;
    shell.rotation.y = -baseRotation * 0.4;
    renderer.render(scene, camera);
  }

  let heroVisible = true;
  function updateLoop() {
    renderer.setAnimationLoop(heroVisible && !document.hidden ? frame : null);
  }
  new IntersectionObserver((entries) => {
    heroVisible = entries[0].isIntersecting;
    updateLoop();
  }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', updateLoop);
  updateLoop();
}

/* Soft radial sprite so each node renders as a glowing orb */
function makeGlowSprite() {
  const size = 64;
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(sprite);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
