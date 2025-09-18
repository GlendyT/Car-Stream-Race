"use client";
import { useParams } from "next/navigation";
import CardProgress from "@/components/CardProgress";
import useTeams from "@/hooks/useTeams";
import ButtonUtil from "@/components/ButtonUtil";
import { montserrat } from "@/utils/helpers";

const Partido = () => {
  const params = useParams();
  const matchId = params.id as string;
  const [teamName1, teamName2] = matchId ? matchId.split("vs") : ["", ""];
  const displayTeam1 =
    teamName1?.charAt(0).toUpperCase() + teamName1?.slice(1) || "Equipo 1";
  const displayTeam2 =
    teamName2?.charAt(0).toUpperCase() + teamName2?.slice(1) || "Equipo 2";

  const {
    handleProgress1Change,
    handleProgress2Change,
    handleSaveProgress1,
    handleSaveProgress2,
    team1,
    team2,
    handleReset,
    team1Error,
    team2Error,
    team1AnimatedProgress,
    team2AnimatedProgress,
  } = useTeams();

  return (
    <section
      className={`min-h-screen p-4 flex flex-wrap bg-gray-100  ${montserrat.className}`}
    >
      <div className="flex flex-col w-auto gap-2  items-center justify-center">
        <h1 className="text-2xl font-bold text-center">
          {displayTeam1} vs {displayTeam2}
        </h1>

        <CardProgress
          teamImage={team1.flag}
          teamName={team1.name}
          teamGoal={team1.goal}
          value={team1.progress}
          handleProgressChange={handleProgress1Change}
          maxGoal={team1.goal}
          allProgress={Math.round(team1AnimatedProgress)}
          difference={Math.max(0, team1.goal - team1.totalProgress)}
          progressBar={
            team1.goal > 0
              ? Math.min((team1AnimatedProgress / team1.goal) * 100, 100)
              : 0
          }
          completedStatus={
            team1.goal > 0
              ? Math.round((team1AnimatedProgress / team1.goal) * 100)
              : 0
          }
          handleSaveProgress={handleSaveProgress1}
          teamHistory={team1.progressHistory}
          errorMessage={team1Error}
        />
        <CardProgress
          teamImage={team2.flag}
          teamName={team2.name}
          teamGoal={team2.goal}
          value={team2.progress}
          handleProgressChange={handleProgress2Change}
          maxGoal={team2.goal}
          allProgress={Math.round(team2AnimatedProgress)}
          difference={Math.max(0, team2.goal - team2.totalProgress)}
          progressBar={
            team2.goal > 0
              ? Math.min((team2AnimatedProgress / team2.goal) * 100, 100)
              : 0
          }
          completedStatus={
            team2.goal > 0
              ? Math.round((team2AnimatedProgress / team2.goal) * 100)
              : 0
          }
          handleSaveProgress={handleSaveProgress2}
          teamHistory={team2.progressHistory}
          errorMessage={team2Error}
        />
        <ButtonUtil
          label="Reiniciar"
          onClick={handleReset}
          className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 "
        />
      </div>
      <div className="flex flex-col w-auto gap-2  items-center justify-center"></div>
    </section>
  );
};

export default Partido;
