export type BirdPosition = {
  x: number;
  y: number;
};

export type ParticleBurst = {
  type: "jump" | "collision";
  x: number;
  y: number;
};
