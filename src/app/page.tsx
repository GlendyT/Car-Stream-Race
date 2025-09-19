"use client";
import ButtonUtil from "@/components/ButtonUtil";
import InputGoal from "@/components/InputGoal";
import Logo from "@/components/Logo";
import SelectorTeams from "@/components/SelectorTeams";
import useTeams from "@/hooks/useTeams";
import { montserrat } from "@/utils/helpers";
import { teams } from "@/utils/teams";
import Image from "next/image";
import Link from "next/link";

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
    loading,
    contentRef,
    loaderRef,
  } = useTeams();

  if (loading) {
    return (
      <section
        ref={loaderRef}
        className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center ${montserrat.className}`}
      >
        <Image
          src="/cars/Monohobi.webp"
          alt="Monohobi Logo"
          width={200}
          height={200}
          className="mb-8"
        />
        <div className="loader"></div>
        <style jsx>{`
          .loader {
            width: 80px;
            aspect-ratio: 4;
            background: radial-gradient(circle closest-side, #000 90%, #0000) 0 /
              calc(100% / 3) 100% no-repeat;
            animation: l2 1s steps(3) infinite;
          }
          @keyframes l2 {
            to {
              background-position: 150%;
            }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section
      ref={contentRef}
      className={`min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center ${montserrat.className} `}
    >
      <Image
        src="/cars/MonohobiLogo.webp"
        alt="Monohobi Logo"
        width={200}
        height={200}
      />
      <form onSubmit={handleSubmit} className="flex flex-col  gap-3">
        <div className="flex flex-wrap w-full items-center justify-center gap-5">
          {/* Equipo 1 */}
          <div className="flex flex-col items-center gap-2 w-auto">
            <h3 className="text-lg font-semibold">Team 1</h3>
            <SelectorTeams
              id="Team1"
              name="team1"
              value={team1.name}
              placeholder="Choose your team"
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
            <h3 className="text-lg font-semibold">Team 2</h3>
            <SelectorTeams
              id="Team2"
              name="team2"
              value={team2.name}
              placeholder="Choose your team"
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

        <div className="flex items-center justify-center">
          <ButtonUtil
            label="START"
            className="bg-black px-4  hover:bg-gray-800 text-white font-extrabold text-lg"
            title="Click to Start"
          />
        </div>
      </form>
      <Logo />
    </section>
  );
};

export default Index;
