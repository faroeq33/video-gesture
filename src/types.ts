export type predictionResult = {
  fullscreen: number;
  label: string;
  confidence: number;
};
export type ClassificationOptions = {
  tolerance: number;
  initClassification?: string;
  startClassifying?: boolean;
};
export type Coordinate = {
  x: number;
  y: number;
  z: number;
  visibility: number;
};
export type PoseCollectionStream = Coordinate[][];
