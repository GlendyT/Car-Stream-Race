"use client";

import React, {
  createContext,
  useState,
  FormEvent,
  useEffect,
  startTransition,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import {
  DetailTeam,
  TeamsContextType,
  TeamsProviderProps,
  ProgressHistory,
} from "../types/index";
import { teams } from "@/utils/teams";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TeamsContext = createContext<TeamsContextType>(null!);

const TeamsProvider = ({ children }: TeamsProviderProps) => {
  const router = useRouter();

  const [team1, setTeam1] = useState<DetailTeam>({
    name: "",
    flag: "",
    goal: 0,
    progress: 0,
    totalProgress: 0,
    progressHistory: [],
    car: "",
  });
  const [team2, setTeam2] = useState<DetailTeam>({
    name: "",
    flag: "",
    goal: 0,
    progress: 0,
    totalProgress: 0,
    progressHistory: [],
    car: "",
  });
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

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("carstreams-data");
    if (savedData) {
      const {
        team1: savedTeam1,
        team2: savedTeam2,
        matchResult: savedMatchResult,
      } = JSON.parse(savedData);
      setTeam1(savedTeam1);
      setTeam2(savedTeam2);
      setMatchResult(savedMatchResult);
      setTeam1AnimatedProgress(savedTeam1.totalProgress);
      setTeam2AnimatedProgress(savedTeam2.totalProgress);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = { team1, team2, matchResult };
    localStorage.setItem("carstreams-data", JSON.stringify(dataToSave));
  }, [team1, team2, matchResult]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (team1.name && team2.name) {
      setMatchResult({ team1, team2 });
      const matchUrl = `${team1.name.toLowerCase()}vs${team2.name.toLowerCase()}`;
      startTransition(() => {
        router.push(`/match/${matchUrl}`);
      });
    }
  };

  const handleTeam1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeamData = teams.find((team) => team.name === e.target.value);
    if (selectedTeamData) {
      // Si el equipo seleccionado es igual al equipo 2, resetear equipo 2
      if (selectedTeamData.name === team2.name) {
        setTeam2({
          name: "",
          flag: "",
          goal: 0,
          progress: 0,
          totalProgress: 0,
          progressHistory: [],
          car: "",
        });
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
      // Si el equipo seleccionado es igual al equipo 1, resetear equipo 1
      if (selectedTeamData.name === team1.name) {
        setTeam1({
          name: "",
          flag: "",
          goal: 0,
          progress: 0,
          totalProgress: 0,
          progressHistory: [],
          car: "",
        });
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

  const handleSaveProgress1 = () => {
    const remaining = team1.goal - team1.totalProgress;
    if (team1.progress > remaining || remaining === 0 || team1.progress === 0)
      return;

    const newHistoryEntry: ProgressHistory = {
      id: Date.now().toString(),
      value: team1.progress,
      timestamp: new Date().toLocaleString("es-ES"),
    };

    const startProgress = team1.totalProgress;
    const endProgress = team1.totalProgress + team1.progress;
    const increment = team1.progress / 20; // 20 steps for animation

    let currentStep = 0;
    const animateProgress = () => {
      if (currentStep <= 20) {
        const animatedValue = Math.min(
          startProgress + increment * currentStep,
          endProgress
        );
        setTeam1AnimatedProgress(animatedValue);
        currentStep++;
        setTimeout(animateProgress, 50); // 50ms per step
      }
    };

    setTeam1((prev) => ({
      ...prev,
      progress: 0,
      totalProgress: prev.totalProgress + prev.progress,
      progressHistory: [...prev.progressHistory, newHistoryEntry],
    }));
    setTeam1Error("");
    animateProgress();
  };

  const handleSaveProgress2 = () => {
    const remaining = team2.goal - team2.totalProgress;
    if (team2.progress > remaining || remaining === 0 || team2.progress === 0)
      return;

    const newHistoryEntry: ProgressHistory = {
      id: Date.now().toString(),
      value: team2.progress,
      timestamp: new Date().toLocaleString("es-ES"),
    };

    const startProgress = team2.totalProgress;
    const endProgress = team2.totalProgress + team2.progress;
    const increment = team2.progress / 20; // 20 steps for animation

    let currentStep = 0;
    const animateProgress = () => {
      if (currentStep <= 20) {
        const animatedValue = Math.min(
          startProgress + increment * currentStep,
          endProgress
        );
        setTeam2AnimatedProgress(animatedValue);
        currentStep++;
        setTimeout(animateProgress, 50); // 50ms per step
      }
    };

    setTeam2((prev) => ({
      ...prev,
      progress: 0,
      totalProgress: prev.totalProgress + prev.progress,
      progressHistory: [...prev.progressHistory, newHistoryEntry],
    }));
    setTeam2Error("");
    animateProgress();
  };

  const handleStartEdit1 = (id: string) => {
    const entry = team1.progressHistory.find((e) => e.id === id);
    if (!entry) return;

    setEditingEntry1(id);
    setTeam1((prev) => ({ ...prev, progress: entry.value }));
  };

  const handleSaveEdit1 = () => {
    if (!editingEntry1) return;

    const entry = team1.progressHistory.find((e) => e.id === editingEntry1);
    if (!entry) return;

    const oldValue = entry.value;
    const newValue = team1.progress;
    const newTotalProgress = team1.totalProgress - oldValue + newValue;

    if (newTotalProgress > team1.goal || newValue <= 0) return;

    const startProgress = team1AnimatedProgress;
    const endProgress = newTotalProgress;
    const increment = (endProgress - startProgress) / 20;

    let currentStep = 0;
    const animateProgress = () => {
      if (currentStep <= 20) {
        const animatedValue = startProgress + increment * currentStep;
        setTeam1AnimatedProgress(animatedValue);
        currentStep++;
        setTimeout(animateProgress, 50);
      }
    };

    setTeam1((prev) => ({
      ...prev,
      progress: 0,
      totalProgress: newTotalProgress,
      progressHistory: prev.progressHistory.map((e) =>
        e.id === editingEntry1 ? { ...e, value: newValue } : e
      ),
    }));
    setEditingEntry1(null);
    animateProgress();
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

  const handleSaveEdit2 = () => {
    if (!editingEntry2) return;

    const entry = team2.progressHistory.find((e) => e.id === editingEntry2);
    if (!entry) return;

    const oldValue = entry.value;
    const newValue = team2.progress;
    const newTotalProgress = team2.totalProgress - oldValue + newValue;

    if (newTotalProgress > team2.goal || newValue <= 0) return;

    const startProgress = team2AnimatedProgress;
    const endProgress = newTotalProgress;
    const increment = (endProgress - startProgress) / 20;

    let currentStep = 0;
    const animateProgress = () => {
      if (currentStep <= 20) {
        const animatedValue = startProgress + increment * currentStep;
        setTeam2AnimatedProgress(animatedValue);
        currentStep++;
        setTimeout(animateProgress, 50);
      }
    };

    setTeam2((prev) => ({
      ...prev,
      progress: 0,
      totalProgress: newTotalProgress,
      progressHistory: prev.progressHistory.map((e) =>
        e.id === editingEntry2 ? { ...e, value: newValue } : e
      ),
    }));
    setEditingEntry2(null);
    animateProgress();
  };

  const handleCancelEdit2 = () => {
    setEditingEntry2(null);
    setTeam2((prev) => ({ ...prev, progress: 0 }));
  };

  const handleReset = () => {
    const initialTeam = {
      name: "",
      flag: "",
      goal: 0,
      progress: 0,
      totalProgress: 0,
      progressHistory: [],
      car: "",
    };
    setTeam1(initialTeam);
    setTeam2(initialTeam);
    setMatchResult(null);
    localStorage.removeItem("carstreams-data");
    router.back();
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
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsProvider };

export default TeamsContext;
