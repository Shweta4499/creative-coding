export function CrystalObstacle() {
  return (
    <group>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.9, 0.16, 0.74]} />
        <meshBasicMaterial color="#151229" />
      </mesh>
      <mesh position={[-0.2, 0.43, 0]}>
        <boxGeometry args={[0.34, 0.7, 0.46]} />
        <meshBasicMaterial color="#7048d7" />
      </mesh>
      <mesh position={[-0.2, 0.84, 0]}>
        <boxGeometry args={[0.2, 0.18, 0.38]} />
        <meshBasicMaterial color="#a27cff" />
      </mesh>
      <mesh position={[0.2, 0.31, 0.04]}>
        <boxGeometry args={[0.3, 0.5, 0.5]} />
        <meshBasicMaterial color="#287bc1" />
      </mesh>
      <mesh position={[0.2, 0.63, 0.04]}>
        <boxGeometry args={[0.16, 0.18, 0.4]} />
        <meshBasicMaterial color="#55b7f3" />
      </mesh>
      <mesh position={[-0.34, 0.5, 0.25]}>
        <boxGeometry args={[0.08, 0.35, 0.05]} />
        <meshBasicMaterial color="#eadcff" />
      </mesh>
      <mesh position={[0.13, 0.28, 0.3]}>
        <boxGeometry args={[0.08, 0.2, 0.05]} />
        <meshBasicMaterial color="#c5efff" />
      </mesh>
      <mesh position={[0.42, 0.15, 0]}>
        <boxGeometry args={[0.18, 0.3, 0.34]} />
        <meshBasicMaterial color="#482885" />
      </mesh>
    </group>
  );
}

export function StoneObstacle() {
  return (
    <group>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.9, 0.36, 0.78]} />
        <meshBasicMaterial color="#172330" />
      </mesh>
      <mesh position={[-0.07, 0.52, 0]}>
        <boxGeometry args={[0.72, 0.34, 0.7]} />
        <meshBasicMaterial color="#3b5263" />
      </mesh>
      <mesh position={[0.05, 0.79, 0]}>
        <boxGeometry args={[0.62, 0.22, 0.64]} />
        <meshBasicMaterial color="#526b78" />
      </mesh>
      <mesh position={[-0.19, 0.98, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.58]} />
        <meshBasicMaterial color="#718791" />
      </mesh>
      <mesh position={[0.22, 0.92, 0]}>
        <boxGeometry args={[0.22, 0.1, 0.58]} />
        <meshBasicMaterial color="#293b49" />
      </mesh>
      <mesh position={[-0.13, 0.54, 0.38]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.07, 0.3, 0.04]} />
        <meshBasicMaterial color="#0b141e" />
      </mesh>
      <mesh position={[0.18, 0.22, 0.42]}>
        <boxGeometry args={[0.2, 0.08, 0.04]} />
        <meshBasicMaterial color="#9bafb2" />
      </mesh>
      <mesh position={[-0.19, 1.1, 0.3]}>
        <boxGeometry args={[0.28, 0.08, 0.08]} />
        <meshBasicMaterial color="#3f9d6d" />
      </mesh>
      <mesh position={[-0.3, 1.15, 0.31]}>
        <boxGeometry args={[0.08, 0.12, 0.07]} />
        <meshBasicMaterial color="#79d58d" />
      </mesh>
    </group>
  );
}

export function ThornObstacle() {
  return (
    <group>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.78, 0.24, 0.7]} />
        <meshBasicMaterial color="#151522" />
      </mesh>
      <mesh position={[-0.12, 0.45, 0]} rotation={[0, 0, -0.16]}>
        <boxGeometry args={[0.3, 0.72, 0.4]} />
        <meshBasicMaterial color="#28483f" />
      </mesh>
      <mesh position={[0.12, 0.79, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.28, 0.55, 0.38]} />
        <meshBasicMaterial color="#376555" />
      </mesh>
      <mesh position={[-0.32, 0.45, 0]} rotation={[0, 0, -0.75]}>
        <boxGeometry args={[0.38, 0.12, 0.3]} />
        <meshBasicMaterial color="#4b7860" />
      </mesh>
      <mesh position={[0.34, 0.72, 0]} rotation={[0, 0, 0.72]}>
        <boxGeometry args={[0.42, 0.12, 0.3]} />
        <meshBasicMaterial color="#4b7860" />
      </mesh>
      <mesh position={[-0.46, 0.58, 0]}>
        <boxGeometry args={[0.16, 0.1, 0.24]} />
        <meshBasicMaterial color="#c84e70" />
      </mesh>
      <mesh position={[0.49, 0.88, 0]}>
        <boxGeometry args={[0.18, 0.1, 0.24]} />
        <meshBasicMaterial color="#c84e70" />
      </mesh>
      <mesh position={[0.02, 1.09, 0]}>
        <boxGeometry args={[0.12, 0.28, 0.26]} />
        <meshBasicMaterial color="#f07288" />
      </mesh>
      <mesh position={[-0.2, 0.36, 0.23]}>
        <boxGeometry args={[0.08, 0.3, 0.05]} />
        <meshBasicMaterial color="#82b989" />
      </mesh>
    </group>
  );
}

export function MeteorObstacle() {
  return (
    <group>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.76, 0.66, 0.72]} />
        <meshBasicMaterial color="#553447" />
      </mesh>
      <mesh position={[-0.32, 0.72, 0]}>
        <boxGeometry args={[0.28, 0.34, 0.58]} />
        <meshBasicMaterial color="#75475c" />
      </mesh>
      <mesh position={[0.3, 0.39, 0]}>
        <boxGeometry args={[0.32, 0.3, 0.62]} />
        <meshBasicMaterial color="#2b1d2d" />
      </mesh>
      <mesh position={[0.1, 0.9, 0]}>
        <boxGeometry args={[0.42, 0.22, 0.54]} />
        <meshBasicMaterial color="#8a5368" />
      </mesh>
      <mesh position={[-0.17, 0.63, 0.38]}>
        <boxGeometry args={[0.2, 0.16, 0.05]} />
        <meshBasicMaterial color="#c06f7e" />
      </mesh>
      <mesh position={[0.18, 0.73, 0.38]}>
        <boxGeometry args={[0.14, 0.1, 0.05]} />
        <meshBasicMaterial color="#f0a17f" />
      </mesh>
      <mesh position={[-0.5, 0.21, 0]}>
        <boxGeometry args={[0.16, 0.16, 0.22]} />
        <meshBasicMaterial color="#8a5368" />
      </mesh>
      <mesh position={[0.48, 1.03, 0]}>
        <boxGeometry args={[0.13, 0.13, 0.2]} />
        <meshBasicMaterial color="#75475c" />
      </mesh>
      <mesh position={[0.38, 0.13, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.16]} />
        <meshBasicMaterial color="#ad6676" />
      </mesh>
    </group>
  );
}
