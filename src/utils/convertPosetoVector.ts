import { PoseCollectionStream } from "../types";
function convertPoseToVector(pose: PoseCollectionStream): number[] {
  //   console.log("input pose: ", pose);
  if (pose.length === 0) {
    return [];
  }
  const convertedPose = pose[0]
    .map((point) => {
      return [point.x, point.y, point.z];
    })
    .flat();

  //   console.log("output pose: ", convertedPose);
  return convertedPose;
}

export default convertPoseToVector;
