import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Mascot3D() {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.6, 7.2);

    function resize() {
      const w = stage.clientWidth,
        h = stage.clientHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffe9b0, 1.1);
    key.position.set(3, 6, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc9a227, 0.6);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const green = new THREE.MeshStandardMaterial({ color: 0x1e5236, roughness: 0.6, metalness: 0.05 });
    const greenDark = new THREE.MeshStandardMaterial({ color: 0x123321, roughness: 0.7 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xc9a227, roughness: 0.35, metalness: 0.3 });
    const skin = new THREE.MeshStandardMaterial({ color: 0xc98a5b, roughness: 0.7 });
    const navy = new THREE.MeshStandardMaterial({ color: 0x223244, roughness: 0.6 });

    const figure = new THREE.Group();

    const legGeo = new THREE.CylinderGeometry(0.16, 0.16, 1.05, 8);
    const legL = new THREE.Mesh(legGeo, navy);
    legL.position.set(-0.2, 0.55, 0);
    const legR = new THREE.Mesh(legGeo, navy);
    legR.position.set(0.2, 0.55, 0);
    figure.add(legL, legR);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.9, 0.42), green);
    torso.position.y = 1.42;
    figure.add(torso);

    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.44), greenDark);
    strap.position.set(0, 1.65, 0);
    figure.add(strap);

    const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.7, 8);
    const armL = new THREE.Mesh(armGeo, green);
    armL.geometry.translate(0, -0.35, 0);
    armL.position.set(-0.5, 1.8, 0);
    armL.rotation.z = 0.25;
    figure.add(armL);

    const armRPivot = new THREE.Group();
    armRPivot.position.set(0.5, 1.8, 0);
    const armR = new THREE.Mesh(armGeo, green);
    armR.geometry.translate(0, -0.35, 0);
    armRPivot.add(armR);
    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 10), skin);
    handR.position.set(0, -0.7, 0);
    armRPivot.add(handR);
    figure.add(armRPivot);

    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 10), skin);
    handL.position.set(-0.5, 1.08, 0);
    figure.add(handL);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 16), skin);
    head.position.y = 2.28;
    figure.add(head);

    const hatGroup = new THREE.Group();
    hatGroup.position.y = 2.5;
    const hatDome = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.9), gold);
    hatGroup.add(hatDome);
    const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 20), gold);
    hatBrim.position.y = 0.02;
    hatGroup.add(hatBrim);
    const hatStripe = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.02, 8, 20), greenDark);
    hatStripe.rotation.x = Math.PI / 2;
    hatStripe.position.y = 0.02;
    hatGroup.add(hatStripe);
    figure.add(hatGroup);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 0.08, 32),
      new THREE.MeshStandardMaterial({ color: 0x0f2e1f, roughness: 0.8 })
    );
    platform.position.y = -0.02;
    figure.add(platform);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.012, 8, 64), gold);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.02;
    figure.add(ring);

    figure.position.y = -1.3;
    scene.add(figure);

    let t = 0;
    let targetRotY = 0,
      currentRotY = 0;
    let rafId;

    function onMouseMove(e) {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      targetRotY = nx * 0.6;
    }
    stage.addEventListener('mousemove', onMouseMove);

    function animate() {
      rafId = requestAnimationFrame(animate);
      t += 0.016;
      figure.position.y = -1.3 + Math.sin(t * 1.4) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.04;
      figure.rotation.y = 0.15 + currentRotY;
      armRPivot.rotation.z = -1.9 + Math.sin(t * 2.6) * 0.35;
      head.rotation.y = Math.sin(t * 0.7) * 0.08;
      hatGroup.position.x = head.position.x;
      hatGroup.rotation.y = head.rotation.y;
      renderer.render(scene, camera);
    }
    resize();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      stage.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
    };
  }, []);

  return (
    <div className="mascot-stage" ref={stageRef}>
      <canvas id="mascot-canvas" ref={canvasRef}></canvas>
      <div className="mascot-caption mono">Site Foreman — On Duty</div>
    </div>
  );
}
