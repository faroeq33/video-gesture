import React from "react";
import { PoseContext } from "./pose-context";

export const usePoseContext = () => {
  const context = React.useContext(PoseContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a PoseProvider");
  }
  return context;
};
