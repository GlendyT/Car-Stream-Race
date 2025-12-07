import { Models } from "appwrite";

export interface History extends Models.Document {
  progress: number;
  date: string;
  matchId?: string;
  team?: string;
}

export interface Match extends Models.Document {
  team1: string;
  team2: string;
  goal1: number;
  goal2: number;
  history?: History[];
}

export interface CreateMatchParams {
  team1: string;
  team2: string;
  goal1: number;
  goal2: number;
}

export interface CreateHistoryParams {
  progress: number;
  date: string;
  matchId: string;
  team: string;
}
