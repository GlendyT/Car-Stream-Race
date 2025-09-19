import React, { FormEvent } from "react";

export type Team = {
  id: number;
  name: string;
  spelling: string;
  flag: string;
  car: string;
};

export type SelectorProps = {
  id: string;
  placeholder: string;
  options: Team[];
  value: string;
  name: string;
  disabled?: boolean;
  className?: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  excludeTeam?: string;
};

export type TeamsContextType = {
  team1: DetailTeam;
  setTeam1: React.Dispatch<React.SetStateAction<DetailTeam>>;
  team2: DetailTeam;
  setTeam2: React.Dispatch<React.SetStateAction<DetailTeam>>;
  matchResult: { team1: DetailTeam; team2: DetailTeam } | null;
  setMatchResult: React.Dispatch<
    React.SetStateAction<{ team1: DetailTeam; team2: DetailTeam } | null>
  >;
  handleTeam1Change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTeam2Change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleGoal1Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoal2Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProgress1Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProgress2Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveProgress1: () => void;
  handleSaveProgress2: () => void;
  handleStartEdit1: (id: string) => void;
  handleSaveEdit1: () => void;
  handleCancelEdit1: () => void;
  handleStartEdit2: (id: string) => void;
  handleSaveEdit2: () => void;
  handleCancelEdit2: () => void;
  editingEntry1: string | null;
  editingEntry2: string | null;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  team1Error: string;
  team2Error: string;
  team1AnimatedProgress: number;
  team2AnimatedProgress: number;
  loading: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
  loaderRef: React.RefObject<HTMLDivElement | null>;
};

export type TeamsProviderProps = {
  children: React.ReactNode;
};

export type ProgressHistory = {
  id: string;
  value: number;
  timestamp: string;
};

export type DetailTeam = {
  name: string;
  goal: number;
  progress: number;
  totalProgress: number;
  progressHistory: ProgressHistory[];
  flag: string;
  car: string;
};

export type InputGoalProps = {
  id: string;
  type: string;
  value: number;
  handleGoalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export type CardProgressProps = {
  teamName: string;
  teamGoal: number;
  teamImage: string;
  value: number;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxGoal: number;
  allProgress: number;
  difference: number;
  progressBar: number;
  completedStatus: number;
  handleSaveProgress: () => void;
  teamHistory: ProgressHistory[];
  handleStartEdit: (id: string) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  isEditing: boolean;
  errorMessage?: string;
};

export type DownloadContextType = {
  handleDownloadImage: () => Promise<void>;
};

export type RaceContextType = {
  svgRef: React.RefObject<SVGSVGElement | null>;
  path1Ref: React.RefObject<SVGPathElement | null>;
  path2Ref: React.RefObject<SVGPathElement | null>;
  car1ImageRef: React.RefObject<HTMLDivElement | null>;
  car1CircleRef: React.RefObject<SVGCircleElement | null>;
  car2ImageRef: React.RefObject<HTMLDivElement | null>;
  car2CircleRef: React.RefObject<SVGCircleElement | null>;
};

export interface CarsProps {
  progress1: number; // valor entre 0 y 1
  progress2: number; // valor entre 0 y 1
  color1?: string;
  color2?: string;
  car1?: string;
  car2?: string;
}


export type RaceProviderProps ={
    children: React.ReactNode;
    progress1?: number;
    progress2?: number;
    color1?: string;
    color2?: string;
    car1?: string;
    car2?: string;
}