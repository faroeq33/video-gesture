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
