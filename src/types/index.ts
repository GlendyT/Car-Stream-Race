import { FormEvent } from "react";

export type Team = {
  id: number;
  name: string;
  spelling: string;
  flag: string;
  car: string

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
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  team1Error: string;
  team2Error: string;
  team1AnimatedProgress: number;
  team2AnimatedProgress: number;
};

export type TeamsProviderProps = {
  children: React.ReactNode;
};

export type ProgressHistory = {
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
  teamHistory: { value: number; timestamp: string }[];
  errorMessage?: string;
};
