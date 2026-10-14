export const GRAVITY = -18;
export const JUMP_SPEED = 7.5;
export const JUMP_COOLDOWN_MS = 180;
export const GROUND_LEVEL = -2.35;
export const GROUND_TOP = -3;
export const BIRD_X = -2;
export const OBSTACLE_SPEED = 3.2;
export const OBSTACLE_SPACING = 5.5;
export const OBSTACLE_HEIGHTS = [0.9, 1.2, 1.55, 1.05];
export const INITIAL_OBSTACLES = OBSTACLE_HEIGHTS.slice(0, 3).map(
  (height) => ({
    x: 0,
    height,
    variant: 0,
  }),
);
export const OBSTACLE_VARIANT_COUNT = 4;

export const STAR_POSITIONS = [
  [-0.46, 0.78],
  [-0.32, 0.55],
  [-0.16, 0.85],
  [0.02, 0.65],
  [0.18, 0.9],
  [0.34, 0.6],
  [0.47, 0.82],
  [-0.4, 0.35],
  [-0.08, 0.42],
  [0.27, 0.38],
] as const;

export const LARGE_STAR_POSITIONS = [
  [-0.38, 0.68],
  [0.1, 0.79],
  [0.4, 0.5],
] as const;

export const CLOUD_POSITIONS = [
  [-0.38, 0.58],
  [0.08, 0.7],
  [0.42, 0.43],
] as const;
