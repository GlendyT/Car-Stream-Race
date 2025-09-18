"use client";
import TeamsContext from "@/context/TeamsProvider";
import { useContext } from "react";

const useTeams = () => {
  return useContext(TeamsContext);
};

export default useTeams;
