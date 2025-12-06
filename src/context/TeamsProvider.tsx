"use client";

import React, {
  createContext,
  useState,
  FormEvent,
  useEffect,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import {
  createMatch,
  getCurrentMatch,
  updateMatch,
  deleteMatch,
  createHistory,
  getHistoryByMatch,
  deleteHistoryByMatch,
  updateHistory,
  client,
  appwriteConfig,
} from "../../lib/appwrite";
import {
  DetailTeam,
  TeamsContextType,
  TeamsProviderProps,
  ProgressHistory,
} from "../types/index";
import { teams } from "@/utils/teams";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "react-toastify";

const TeamsContext = createContext<TeamsContextType>(null!);

// Constantes
const INITIAL_TEAM: DetailTeam = {
  name: "",
  flag: "",
  goal: 0,
  progress: 0,
  totalProgress: 0,
  progressHistory: [],
  car: "",
};

// Funciones auxiliares
const convertHistoriesToProgressHistory = (histories: { $id: string; progress: number; date: string }[]): ProgressHistory[] => {
  return histories.map(h => ({
    id: h.$id,
    value: h.progress,
    timestamp: new Date(h.date).toLocaleString("es-ES"),
  }));
};

const calculateTotalProgress = (histories: { progress: number }[]): number => {
  return histories.reduce((sum, h) => sum + h.progress, 0);
};

const createProgressAnimation = (
  startProgress: number,
  endProgress: number,
  setAnimatedProgress: (value: number) => void
) => {
  const increment = (endProgress - startProgress) / 20;
  let currentStep = 0;

  const animate = () => {
    if (currentStep <= 20) {
      const animatedValue = startProgress + increment * currentStep;
      setAnimatedProgress(animatedValue);
      currentStep++;
      setTimeout(animate, 50);
    }
  };

  return animate;
};

const TeamsProvider = ({ children }: TeamsProviderProps) => {
  const pathname = usePathname();
  const [currentMatchId, setCurrentMatchId] = useState<string | null>(null);

  const [team1, setTeam1] = useState<DetailTeam>(INITIAL_TEAM);
  const [team2, setTeam2] = useState<DetailTeam>(INITIAL_TEAM);
  const [matchResult, setMatchResult] = useState<{
    team1: DetailTeam;
    team2: DetailTeam;
  } | null>(null);
  const [team1Error, setTeam1Error] = useState<string>("");
  const [team2Error, setTeam2Error] = useState<string>("");
  const [team1AnimatedProgress, setTeam1AnimatedProgress] = useState<number>(0);
  const [team2AnimatedProgress, setTeam2AnimatedProgress] = useState<number>(0);
  const [editingEntry1, setEditingEntry1] = useState<string | null>(null);
  const [editingEntry2, setEditingEntry2] = useState<string | null>(null);
  const [ isAdmin, setIsAdmin ] = useState<boolean>(false);

  // Detectar si está en la página admin
  useEffect(() => {
    setIsAdmin(pathname.includes('/admin'));
  }, [pathname]);

  // Función reutilizable para cargar datos del match
  const loadMatchData = async () => {
    try {
      const match = await getCurrentMatch();
      if (match) {
        setCurrentMatchId(match.$id);
        
        const team1Data = teams.find(t => t.name === match.team1);
        const team2Data = teams.find(t => t.name === match.team2);

        const histories = await getHistoryByMatch(match.$id);
        const team1Histories = histories.filter(h => h.team === 'team1');
        const team2Histories = histories.filter(h => h.team === 'team2');

        const team1TotalProgress = calculateTotalProgress(team1Histories);
        const team2TotalProgress = calculateTotalProgress(team2Histories);

        const team1ProgressHistory = convertHistoriesToProgressHistory(team1Histories);
        const team2ProgressHistory = convertHistoriesToProgressHistory(team2Histories);

        const loadedTeam1: DetailTeam = {
          name: match.team1,
          flag: team1Data?.flag || "",
          car: team1Data?.car || "",
          goal: match.goal1,
          progress: 0,
          totalProgress: team1TotalProgress,
          progressHistory: team1ProgressHistory,
        };

        const loadedTeam2: DetailTeam = {
          name: match.team2,
          flag: team2Data?.flag || "",
          car: team2Data?.car || "",
          goal: match.goal2,
          progress: 0,
          totalProgress: team2TotalProgress,
          progressHistory: team2ProgressHistory,
        };

        setTeam1(loadedTeam1);
        setTeam2(loadedTeam2);
        setMatchResult({ team1: loadedTeam1, team2: loadedTeam2 });
        setTeam1AnimatedProgress(loadedTeam1.totalProgress);
        setTeam2AnimatedProgress(loadedTeam2.totalProgress);
      } else {
        setTeam1(INITIAL_TEAM);
        setTeam2(INITIAL_TEAM);
        setMatchResult(null);
        setTeam1AnimatedProgress(0);
        setTeam2AnimatedProgress(0);
        setCurrentMatchId(null);
      }
    } catch (error) {
      console.error("Error loading match data:", error);
    }
  };

  // Load match from database on mount
  useEffect(() => {
    loadMatchData();
  }, []);

  // Appwrite Realtime - Suscribirse a cambios en las colecciones
  useEffect(() => {
    const unsubscribeMatch = client.subscribe(
      `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.matchCollectionId}.documents`,
      (response) => {
        console.log("Match realtime event:", response);
        loadMatchData();
      }
    );

    const unsubscribeHistory = client.subscribe(
      `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.historyCollectionId}.documents`,
      (response) => {
        console.log("History realtime event:", response);
        loadMatchData();
      }
    );

    return () => {
      if (typeof unsubscribeMatch === 'function') {
        unsubscribeMatch();
      }
      if (typeof unsubscribeHistory === 'function') {
        unsubscribeHistory();
      }
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (team1.name && team2.name) {
      setMatchResult({ team1, team2 });
    }
  };

  const handleSaveMatch = async () => {
    try {
      if (!team1.name || !team2.name) {
        toast.error("Both teams must be selected to save the match.");
        return;
      }

      const matchData = {
        team1: team1.name,
        team2: team2.name,
        goal1: team1.goal,
        goal2: team2.goal,
      };

      if (currentMatchId) {
        // Actualizar partido existente
        await updateMatch(currentMatchId, matchData);
      } else {
        // Crear nuevo partido
        const newMatch = await createMatch(matchData);
        setCurrentMatchId(newMatch.$id);
      }

      toast.success("Match saved successfully.");
    } catch (error) {
      console.error("Error saving match:", error);
      toast.error("Error saving match. Please try again.");
    }
  };


  const handleTeam1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeamData = teams.find((team) => team.name === e.target.value);
    if (selectedTeamData) {
      if (selectedTeamData.name === team2.name) {
        setTeam2(INITIAL_TEAM);
      }
      setTeam1({
        name: selectedTeamData.name,
        flag: selectedTeamData.flag,
        goal: team1.goal,
        progress: team1.progress,
        totalProgress: team1.totalProgress,
        progressHistory: team1.progressHistory,
        car: selectedTeamData.car,
      });
    }
  };

  const handleTeam2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeamData = teams.find((team) => team.name === e.target.value);
    if (selectedTeamData) {
      if (selectedTeamData.name === team1.name) {
        setTeam1(INITIAL_TEAM);
      }
      setTeam2({
        name: selectedTeamData.name,
        flag: selectedTeamData.flag,
        goal: team2.goal,
        progress: team2.progress,
        totalProgress: team2.totalProgress,
        progressHistory: team2.progressHistory,
        car: selectedTeamData.car,
      });
    }
  };

  const handleGoal1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const goalValue = parseInt(e.target.value) || 0;
    setTeam1((prev) => ({ ...prev, goal: goalValue }));
  };

  const handleGoal2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const goalValue = parseInt(e.target.value) || 0;
    setTeam2((prev) => ({ ...prev, goal: goalValue }));
  };

  const handleProgress1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progressValue = parseInt(e.target.value) || 0;
    const remaining = team1.goal - team1.totalProgress;

    if (progressValue > remaining) {
      setTeam1Error(`You can't add more than ${remaining}.`);
    } else {
      setTeam1Error("");
    }

    setTeam1((prev) => ({ ...prev, progress: progressValue }));
  };

  const handleProgress2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progressValue = parseInt(e.target.value) || 0;
    const remaining = team2.goal - team2.totalProgress;

    if (progressValue > remaining) {
      setTeam2Error(
        `No puedes agregar más de ${remaining}. Restante: ${remaining}`
      );
    } else {
      setTeam2Error("");
    }

    setTeam2((prev) => ({ ...prev, progress: progressValue }));
  };

  const handleSaveProgress1 = async () => {
    const remaining = team1.goal - team1.totalProgress;
    if (team1.progress > remaining || remaining === 0 || team1.progress === 0 || !currentMatchId)
      return;

    const newHistoryEntry: ProgressHistory = {
      id: Date.now().toString(),
      value: team1.progress,
      timestamp: new Date().toLocaleString("es-ES"),
    };

    try {
      await createHistory({
        progress: team1.progress,
        date: new Date().toISOString(),
        matchId: currentMatchId,
        team: 'team1',
      });

      const startProgress = team1.totalProgress;
      const endProgress = team1.totalProgress + team1.progress;
      const animateProgress = createProgressAnimation(startProgress, endProgress, setTeam1AnimatedProgress);

      setTeam1((prev) => ({
        ...prev,
        progress: 0,
        totalProgress: prev.totalProgress + prev.progress,
        progressHistory: [...prev.progressHistory, newHistoryEntry],
      }));
      setTeam1Error("");
      animateProgress();
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Error saving progress. Please try again.");
    }
  };

  const handleSaveProgress2 = async () => {
    const remaining = team2.goal - team2.totalProgress;
    if (team2.progress > remaining || remaining === 0 || team2.progress === 0 || !currentMatchId)
      return;

    const newHistoryEntry: ProgressHistory = {
      id: Date.now().toString(),
      value: team2.progress,
      timestamp: new Date().toLocaleString("es-ES"),
    };

    try {
      await createHistory({
        progress: team2.progress,
        date: new Date().toISOString(),
        matchId: currentMatchId,
        team: 'team2',
      });

      const startProgress = team2.totalProgress;
      const endProgress = team2.totalProgress + team2.progress;
      const animateProgress = createProgressAnimation(startProgress, endProgress, setTeam2AnimatedProgress);

      setTeam2((prev) => ({
        ...prev,
        progress: 0,
        totalProgress: prev.totalProgress + prev.progress,
        progressHistory: [...prev.progressHistory, newHistoryEntry],
      }));
      setTeam2Error("");
      animateProgress();
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Error saving progress. Please try again.");
    }
  };

  const handleStartEdit1 = (id: string) => {
    const entry = team1.progressHistory.find((e) => e.id === id);
    if (!entry) return;

    setEditingEntry1(id);
    setTeam1((prev) => ({ ...prev, progress: entry.value }));
  };

  const handleSaveEdit1 = async () => {
    if (!editingEntry1) return;

    const entry = team1.progressHistory.find((e) => e.id === editingEntry1);
    if (!entry) return;

    const oldValue = entry.value;
    const newValue = team1.progress;
    const newTotalProgress = team1.totalProgress - oldValue + newValue;

    if (newTotalProgress > team1.goal || newValue <= 0) return;

    try {
      await updateHistory(editingEntry1, {
        progress: newValue,
        date: new Date().toISOString(),
      });

      const animateProgress = createProgressAnimation(team1AnimatedProgress, newTotalProgress, setTeam1AnimatedProgress);

      setTeam1((prev) => ({
        ...prev,
        progress: 0,
        totalProgress: newTotalProgress,
        progressHistory: prev.progressHistory.map((e) =>
          e.id === editingEntry1 ? { ...e, value: newValue, timestamp: new Date().toLocaleString("es-ES") } : e
        ),
      }));
      setEditingEntry1(null);
      animateProgress();
    } catch (error) {
      console.error("Error updating history:", error);
      toast.error("Error updating progress. Please try again.");
    }
  };

  const handleCancelEdit1 = () => {
    setEditingEntry1(null);
    setTeam1((prev) => ({ ...prev, progress: 0 }));
  };

  const handleStartEdit2 = (id: string) => {
    const entry = team2.progressHistory.find((e) => e.id === id);
    if (!entry) return;

    setEditingEntry2(id);
    setTeam2((prev) => ({ ...prev, progress: entry.value }));
  };

  const handleSaveEdit2 = async () => {
    if (!editingEntry2) return;

    const entry = team2.progressHistory.find((e) => e.id === editingEntry2);
    if (!entry) return;

    const oldValue = entry.value;
    const newValue = team2.progress;
    const newTotalProgress = team2.totalProgress - oldValue + newValue;

    if (newTotalProgress > team2.goal || newValue <= 0) return;

    try {
      await updateHistory(editingEntry2, {
        progress: newValue,
        date: new Date().toISOString(),
      });

      const animateProgress = createProgressAnimation(team2AnimatedProgress, newTotalProgress, setTeam2AnimatedProgress);

      setTeam2((prev) => ({
        ...prev,
        progress: 0,
        totalProgress: newTotalProgress,
        progressHistory: prev.progressHistory.map((e) =>
          e.id === editingEntry2 ? { ...e, value: newValue, timestamp: new Date().toLocaleString("es-ES") } : e
        ),
      }));
      setEditingEntry2(null);
      animateProgress();
    } catch (error) {
      console.error("Error updating history:", error);
      toast.error("Error updating progress. Please try again.");
    }
  };

  const handleCancelEdit2 = () => {
    setEditingEntry2(null);
    setTeam2((prev) => ({ ...prev, progress: 0 }));
  };

  const handleReset = async () => {
    try {
      if (currentMatchId) {
        await deleteHistoryByMatch(currentMatchId);
        await deleteMatch(currentMatchId);
        setCurrentMatchId(null);
      }

      setTeam1(INITIAL_TEAM);
      setTeam2(INITIAL_TEAM);
      setMatchResult(null);
      setTeam1AnimatedProgress(0);
      setTeam2AnimatedProgress(0);
    } catch (error) {
      console.error("Error resetting match:", error);
      toast.error("Error resetting match. Please try again.");
    }
  };

  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setLoading(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  useGSAP(() => {
    if (loading) {
      const timer = setTimeout(() => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setLoading(false),
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useGSAP(() => {
    if (!loading && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    }
  }, [loading]);

  return (
    <TeamsContext.Provider
      value={{
        team1,
        setTeam1,
        team2,
        setTeam2,
        handleSubmit,
        handleSaveMatch,
        handleTeam1Change,
        handleTeam2Change,
        handleGoal1Change,
        handleGoal2Change,
        handleProgress1Change,
        handleProgress2Change,
        handleSaveProgress1,
        handleSaveProgress2,
        handleStartEdit1,
        handleSaveEdit1,
        handleCancelEdit1,
        handleStartEdit2,
        handleSaveEdit2,
        handleCancelEdit2,
        editingEntry1,
        editingEntry2,
        handleReset,
        matchResult,
        setMatchResult,
        team1Error,
        team2Error,
        team1AnimatedProgress,
        team2AnimatedProgress,
        loading,
        contentRef,
        loaderRef,
        isAdmin, setIsAdmin
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsProvider };

export default TeamsContext;
