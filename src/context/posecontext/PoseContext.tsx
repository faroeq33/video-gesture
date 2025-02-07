import React, { useState } from "react";
import { Coordinate } from "../../utils/convertPosetoVector";

interface PoseContextType {
  poseData: Coordinate[][] | [];
  setPoseData: React.Dispatch<React.SetStateAction<Coordinate[][] | []>>;
}

export const PoseContext = React.createContext<PoseContextType | undefined>(
  undefined
);

export const PoseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [poseData, setPoseData] = useState<Coordinate[][] | []>([]);

  return (
    <PoseContext.Provider
      value={{
        poseData,
        setPoseData,
      }}
    >
      {children}
    </PoseContext.Provider>
  );
};
