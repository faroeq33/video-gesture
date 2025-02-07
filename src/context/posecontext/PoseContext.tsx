import React, { useState } from "react";
import { PoseCollectionStream } from "../../types";

interface PoseContextType {
  poseData: PoseCollectionStream | [];
  setPoseData: React.Dispatch<React.SetStateAction<PoseCollectionStream | []>>;
}

export const PoseContext = React.createContext<PoseContextType | undefined>(
  undefined
);

export const PoseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [poseData, setPoseData] = useState<PoseCollectionStream | []>([]);

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
