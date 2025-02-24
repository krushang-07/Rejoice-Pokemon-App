"use client";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef, useState } from "react";

const PikachuScene = () => {
  const mountRef = useRef(null);
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 10;
    controls.minDistance = 3;

    // Lighting
    const setupLights = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0xffd700, 0.5, 10);
      pointLight.position.set(0, 2, 2);
      scene.add(pointLight);
    };

    // Ground plane
    const createGround = () => {
      const groundGeometry = new THREE.PlaneGeometry(10, 10);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x90ee90,
        roughness: 0.8,
        metalness: 0.2,
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1;
      ground.receiveShadow = true;
      scene.add(ground);
    };

    // Pikachu creation
    const createPikachu = () => {
      const group = new THREE.Group();

      // Body
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.3,
        metalness: 0.1,
      });

      const body = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 32, 32),
        bodyMaterial
      );
      body.castShadow = true;
      group.add(body);

      // Head
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 32, 32),
        bodyMaterial
      );
      head.position.set(0, 1.5, 0);
      head.castShadow = true;
      group.add(head);

      // Arms
      const armGeometry = new THREE.CapsuleGeometry(0.2, 0.8, 4, 8);
      const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
      leftArm.position.set(-1.3, 0.2, 0);
      leftArm.rotation.z = -Math.PI / 4;
      leftArm.castShadow = true;
      group.add(leftArm);

      const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
      rightArm.position.set(1.3, 0.2, 0);
      rightArm.rotation.z = Math.PI / 4;
      rightArm.castShadow = true;
      group.add(rightArm);

      // Ears with better geometry
      const earShape = new THREE.Shape();
      earShape.moveTo(0, 0);
      earShape.lineTo(0.4, 1.2);
      earShape.lineTo(-0.4, 1.2);
      earShape.lineTo(0, 0);

      const earGeometry = new THREE.ExtrudeGeometry(earShape, {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 3,
      });

      const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
      leftEar.position.set(-0.6, 2.2, 0);
      leftEar.rotation.x = Math.PI;
      leftEar.rotation.z = -0.3;
      group.add(leftEar);

      const rightEar = leftEar.clone();
      rightEar.position.set(0.6, 2.2, 0);
      rightEar.rotation.z = 0.3;
      group.add(rightEar);

      // Face features
      const createFaceFeatures = () => {
        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.3, 1.7, 0.8);
        group.add(leftEye);

        const rightEye = leftEye.clone();
        rightEye.position.x = 0.3;
        group.add(rightEye);

        // Cheeks
        const cheekGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const cheekMaterial = new THREE.MeshStandardMaterial({
          color: 0xff4500,
          emissive: 0xff4500,
          emissiveIntensity: 0.2,
        });

        const leftCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
        leftCheek.position.set(-0.5, 1.5, 0.75);
        group.add(leftCheek);

        const rightCheek = leftCheek.clone();
        rightCheek.position.x = 0.5;
        group.add(rightCheek);

        // Nose and mouth
        const nose = new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 16, 16),
          eyeMaterial
        );
        nose.position.set(0, 1.6, 0.85);
        group.add(nose);

        const mouth = new THREE.Mesh(
          new THREE.TorusGeometry(0.15, 0.02, 16, 100, Math.PI),
          eyeMaterial
        );
        mouth.position.set(0, 1.4, 0.85);
        mouth.rotation.x = Math.PI / 2;
        group.add(mouth);
      };

      createFaceFeatures();

      // Tail
      const createTail = () => {
        const tailShape = new THREE.Shape();
        tailShape.moveTo(0, 0);
        tailShape.lineTo(0.5, 1);
        tailShape.lineTo(1, 0.5);
        tailShape.lineTo(1.5, 1.5);
        tailShape.lineTo(0.8, 1.2);
        tailShape.lineTo(0.3, 0.7);
        tailShape.lineTo(0, 0);

        const tailGeometry = new THREE.ExtrudeGeometry(tailShape, {
          depth: 0.1,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 3,
        });

        const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
        tail.scale.set(0.8, 0.8, 0.8);
        tail.position.set(0, 0.5, -1.2);
        tail.rotation.y = Math.PI;
        tail.castShadow = true;
        group.add(tail);

        return tail;
      };

      const tail = createTail();

      // Animation mixer for complex animations
      const mixer = new THREE.AnimationMixer(group);

      // Waving animation
      const startWaving = () => {
        const rightArm = group.children.find(
          (child) => child.position.x === 1.3 && child.position.y === 0.2
        );
        if (rightArm) {
          const initialRotation = rightArm.rotation.z;
          const wavingKeyframes = new THREE.NumberKeyframeTrack(
            ".rotation[z]",
            [0, 0.5, 1],
            [initialRotation, Math.PI / 2, initialRotation]
          );
          const clip = new THREE.AnimationClip("wave", 1, [wavingKeyframes]);
          const action = mixer.clipAction(clip);
          action.setLoop(THREE.LoopRepeat, 3);
          action.play();
        }
      };

      scene.add(group);
      return { group, mixer, startWaving };
    };

    setupLights();
    createGround();
    const { group, mixer, startWaving } = createPikachu();

    // Animation loop
    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      mixer.update(delta);

      // Gentle bobbing motion
      group.position.y = Math.sin(clock.getElapsedTime()) * 0.1;

      // Tail wagging
      const tail = group.children[group.children.length - 1];
      tail.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.2;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Wave animation trigger
    if (isWaving) {
      startWaving();
      setIsWaving(false);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);

      // Cleanup Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [isWaving]);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 right-0 bg-sky-400 p-4 text-center">
        <h1 className="text-2xl font-bold text-white">Interactive Pikachu</h1>
        <button
          className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors"
          onClick={() => setIsWaving(true)}
        >
          Wave!
        </button>
      </div>
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

export default PikachuScene;
