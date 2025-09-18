"use client";
import ButtonUtil from "@/components/ButtonUtil";
import InputGoal from "@/components/InputGoal";
import SelectorTeams from "@/components/SelectorTeams";
import useTeams from "@/hooks/useTeams";
import { montserrat } from "@/utils/helpers";
import { teams } from "@/utils/teams";

const Index = () => {
  const {
    handleSubmit,
    handleGoal1Change,
    handleGoal2Change,
    handleTeam1Change,
    handleTeam2Change,
    team1,
    team2,
    matchResult,
  } = useTeams();

  return (
    <section className={`min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center ${montserrat.className} `}>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-2">
        <div className="flex flex-wrap w-full items-center justify-center gap-5">
          {/* Equipo 1 */}
          <div className="flex flex-col items-center gap-2 w-auto">
            <h3 className="text-lg font-semibold">Equipo 1</h3>
            <SelectorTeams
              id="Team1"
              name="team1"
              value={team1.name}
              placeholder="Selecciona un equipo"
              options={teams}
              className="p-2 rounded-md w-full"
              handleChange={handleTeam1Change}
              excludeTeam={team2.name}
              disabled={!!matchResult}
            />
            <InputGoal
              id="goal1"
              type="number"
              value={team1.goal}
              handleGoalChange={handleGoal1Change}
              disabled={!!matchResult}
            />
          </div>

          {/* VS */}
          <div className="flex w-auto max-sm:w-full items-center justify-center">
            <span className="text-2xl font-bold">VS</span>
          </div>

          {/* Equipo 2 */}
          <div className="flex flex-col gap-2 w-auto items-center">
            <h3 className="text-lg font-semibold">Equipo 2</h3>
            <SelectorTeams
              id="Team2"
              name="team2"
              value={team2.name}
              placeholder="Selecciona un equipo"
              options={teams}
              className="p-2 rounded-md  w-full"
              handleChange={handleTeam2Change}
              excludeTeam={team1.name}
              disabled={!!matchResult}
            />
            <InputGoal
              id="goal2"
              type="number"
              value={team2.goal}
              handleGoalChange={handleGoal2Change}
              disabled={!!matchResult}
            />
          </div>
        </div>

        <ButtonUtil label="Iniciar Partido" />
      </form>
    </section>
  );
};

export default Index;
