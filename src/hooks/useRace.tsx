"use client";

import RaceContext from "@/context/RaceProvider";
import { useContext } from "react";

const useRace = () => {
  return useContext(RaceContext);
};

export default useRace;
