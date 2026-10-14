"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function Earth() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#05070d");

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000,
        );
        camera.position.z = 4;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        // Earth geometry
        const geometry = new THREE.SphereGeometry(1.3, 128, 128);
        geometry.setAttribute("uv2", geometry.attributes.uv.clone());

        const textureLoader = new THREE.TextureLoader();
        const loadMap = (url: string, srgb = false) => {
            const texture = textureLoader.load(url);
            texture.colorSpace = srgb
                ? THREE.SRGBColorSpace
                : THREE.NoColorSpace;
            return texture;
        };

        const dayMap = loadMap("/2k_earth_daymap.jpg", true);
        const ambientMap = loadMap("/2k_earth_daymap_ambient.png");
        const displacementMap = loadMap("/2k_earth_daymap_displacement.png");
        const normalMap = loadMap("/2k_earth_daymap_normal.png");
        const specularMap = loadMap("/2k_earth_daymap_specular.png");

        const material = new THREE.MeshStandardMaterial({
            map: dayMap,
            aoMap: ambientMap,
            displacementMap,
            displacementScale: 0.12,
            displacementBias: -0.05,
            normalMap,
            roughnessMap: specularMap,
            roughness: 1,
            metalness: 0,
        });

        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));

        const sunlight = new THREE.DirectionalLight(0xffffff, 3);
        sunlight.position.set(5, 3, 5);
        scene.add(sunlight);

        // Orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 2;
        controls.maxDistance = 8;

        // Animation
        let animationId = 0;

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            earth.rotation.y += 0.002;
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // Responsive resizing
        const resizeObserver = new ResizeObserver(() => {
            const width = container.clientWidth;
            const height = container.clientHeight;

            if (!width || !height) return;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });

        resizeObserver.observe(container);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            controls.dispose();
            geometry.dispose();
            dayMap.dispose();
            ambientMap.dispose();
            displacementMap.dispose();
            normalMap.dispose();
            specularMap.dispose();
            material.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return <div ref={containerRef} className="h-screen w-full" />;
}
