import React, { useState } from "react";
import { Coordinate } from "../utils/convertPosetoVector";

interface PoseContextType {
  poseData: Coordinate[][] | [];
  setPoseData: React.Dispatch<React.SetStateAction<Coordinate[][] | []>>;
}

const PoseContext = React.createContext<PoseContextType | undefined>(undefined);

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

export const usePoseContext = () => {
  const context = React.useContext(PoseContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a PoseProvider");
  }
  return context;
};
