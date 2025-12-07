"use client";
import ButtonUtil from "@/components/ButtonUtil";
import CardProgress from "@/components/CardProgress";
import InputGoal from "@/components/InputGoal";
import Logo from "@/components/Logo";
import SelectorTeams from "@/components/SelectorTeams";
import useTeams from "@/hooks/useTeams";
import { montserrat } from "@/utils/helpers";
import { teams } from "@/utils/teams";
import Image from "next/image";



const Admin = () => {
  const {
    handleSubmit,
    handleSaveMatch,
    handleGoal1Change,
    handleGoal2Change,
    handleTeam1Change,
    handleTeam2Change,
    matchResult,
    loading,
    contentRef,
    loaderRef,
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
    team1,
    team2,
    handleReset,
    team1Error,
    team2Error,
    team1AnimatedProgress,
    team2AnimatedProgress,
    isAdmin,
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
      className={`min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-between  ${montserrat.className} `}
    >
      <div className="flex flex-col items-center w-full h-full  gap-4">
        <div className="flex flex-col items-center justify-center">
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
          </form>

          <div className="flex flex-row gap-2 mt-2">
            <ButtonUtil
              label="Restart"
              onClick={handleReset}
              className={`px-4 py-2  text-white rounded-md ${
                team1.goal > 0 || team2.goal > 0
                  ? "bg-red-600 hover:bg-red-500 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              }
                 `}
              title="Click to Reset the Match"
            />{" "}
            <ButtonUtil
              label="Save Match"
              onClick={handleSaveMatch}
              className={`bg-black px-4  hover:bg-gray-600 text-white font-extrabold ${
                !team1.name || !team2.name
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              title="Click to Save Match to Database"
              disabled={!team1.name || !team2.name}
            />
          </div>
        </div>

        <div className="flex max-sm:flex-col gap-4">
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
            handleStartEdit={handleStartEdit1}
            handleSaveEdit={handleSaveEdit1}
            handleCancelEdit={handleCancelEdit1}
            isEditing={!!editingEntry1}
            errorMessage={team1Error}
            isAdmin={isAdmin}
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
            handleStartEdit={handleStartEdit2}
            handleSaveEdit={handleSaveEdit2}
            handleCancelEdit={handleCancelEdit2}
            isEditing={!!editingEntry2}
            errorMessage={team2Error}
            isAdmin={isAdmin}
          />
        </div>
      </div>
      <Logo />
    </section>
  );
};

export default Admin;
