"use client";
import { useParams } from "next/navigation";
import CardProgress from "@/components/CardProgress";
import useTeams from "@/hooks/useTeams";
import ButtonUtil from "@/components/ButtonUtil";
import { montserrat } from "@/utils/helpers";
import Cars from "../Cars";
import Image from "next/image";
import { RaceProvider } from "@/context/RaceProvider";
import useDownload from "@/hooks/useDownload";

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
  } = useTeams();
  const { handleDownloadImage } = useDownload();

  // Validar que los datos estén disponibles
  if (
    !team1 ||
    !team2 ||
    team1AnimatedProgress === undefined ||
    team2AnimatedProgress === undefined
  ) {
    return <div>Cargando...</div>;
  }

  return (
    <section
      className={`min-h-screen    flex flex-row max-lg:flex-col w-full h-full bg-gray-100  gap-2 max-sm:pb-4 max-sm:gap-0 items-center justify-center  ${montserrat.className}`}
    >
      <div
        className=" w-[500px] max-sm:w-auto lg:h-[600px]  flex items-center justify-center bg-[url('/cars/1.carretera.webp')] bg-cover lg:bg-contain bg-center bg-no-repeat max-sm:h-[700px] "
        id="print"
      >
        <RaceProvider
          progress1={
            team1?.goal > 0
              ? Math.min((team1AnimatedProgress || 0) / team1.goal, 1)
              : 0
          }
          progress2={
            team2?.goal > 0
              ? Math.min((team2AnimatedProgress || 0) / team2.goal, 1)
              : 0
          }
          car1={team1?.car}
          car2={team2?.car}
        >
          <Cars
            progress1={
              team1?.goal > 0
                ? Math.min((team1AnimatedProgress || 0) / team1.goal, 1)
                : 0
            }
            progress2={
              team2?.goal > 0
                ? Math.min((team2AnimatedProgress || 0) / team2.goal, 1)
                : 0
            }
            car1={team1?.car}
            car2={team2?.car}
          />
        </RaceProvider>
      </div>

      <div className="flex flex-col w-auto h-auto gap-1 items-center justify-center">
        <Image
          src="/cars/MonohobiLogo.webp"
          alt="Monohobi Logo"
          width={140}
          height={140}
          className="mb-0 max-sm:hidden"
        />
        <h1 className="text-lg font-bold text-center">
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
          handleStartEdit={handleStartEdit1}
          handleSaveEdit={handleSaveEdit1}
          handleCancelEdit={handleCancelEdit1}
          isEditing={!!editingEntry1}
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
          handleStartEdit={handleStartEdit2}
          handleSaveEdit={handleSaveEdit2}
          handleCancelEdit={handleCancelEdit2}
          isEditing={!!editingEntry2}
          errorMessage={team2Error}
        />
        <div className="flex flex-row gap-2 mt-2">
          <ButtonUtil
            label="Restart"
            onClick={handleReset}
            className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 "
            title="Click to Reset the Match"
          />
          <ButtonUtil
            label="Download Race"
            onClick={handleDownloadImage}
            className="w-auto bg-black hover:bg-gray-700 text-white px-2  flex items-center justify-center"
            title="Click to Download an image of the Race"
          />
        </div>
      </div>
    </section>
  );
};

export default Partido;
