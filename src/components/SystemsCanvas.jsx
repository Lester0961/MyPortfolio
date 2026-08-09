import { useEffect, useRef } from "react";
import * as THREE from "three";

const createParticlePositions = (count) => {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const radius = 2.2 + Math.random() * 3.8;
    const angle = Math.random() * Math.PI * 2;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 5.5;
    positions[index * 3 + 2] = Math.sin(angle) * radius - 1.5;
  }
  return positions;
};

export default function SystemsCanvas({ reducedMotion }) {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !canvasRef.current || !hostRef.current) return undefined;

    const canvas = canvasRef.current;
    const host = hostRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.42, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x7890ff,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.rotation.set(0.4, -0.55, 0.2);
    group.add(core);

    const shellGeometry = new THREE.TorusKnotGeometry(2.25, 0.025, 180, 12, 2, 5);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0x5570ff,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.rotation.x = 0.4;
    group.add(shell);

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(createParticlePositions(440), 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xa8b6ff,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const target = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };

    const handlePointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.7;
      target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.45;
    };

    const handlePointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    host.addEventListener("pointermove", handlePointerMove, { passive: true });
    host.addEventListener("pointerleave", handlePointerLeave);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    let frameId = 0;
    const startTime = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;
      group.rotation.y = elapsed * 0.08 + pointer.x;
      group.rotation.x = Math.sin(elapsed * 0.18) * 0.08 + pointer.y;
      core.rotation.z = elapsed * -0.12;
      shell.rotation.z = elapsed * 0.055;
      particles.rotation.y = elapsed * -0.025;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="systems-canvas-host" ref={hostRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
