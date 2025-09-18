import { CardProgressProps } from "@/types";
import { Progress } from "flowbite-react";
import Image from "next/image";
import React from "react";
import ButtonUtil from "./ButtonUtil";
import { formatNumberWithCommas } from "@/utils/helpers";

const CardProgress = ({
  teamName,
  teamGoal,
  value,
  handleProgressChange,
  allProgress,
  difference,
  progressBar,
  completedStatus,
  handleSaveProgress,
  teamHistory,
  teamImage,
  errorMessage,
}: CardProgressProps) => {
  return (
    <div className="flex flex-col px-4 py-3 w-full gap-2 bg-gray-200 rounded-xl ">
      <div className="flex flex-row w-full  gap-2">
        {teamImage && (
          <Image
            src={teamImage}
            alt={teamName}
            width={100}
            height={10}
            className=" object-cover rounded-lg   "
            priority
          />
        )}
        <div className="flex flex-col ">
          <div className="flex flex-row justify-between text-center text-black">
            <p className="text-md font-bold">{teamName}</p>
            <p className=" flex flex-col text-md font-bold">
              {" "}
              {formatNumberWithCommas(teamGoal)}
              <span className="text-xs text-gray-400">Goal</span>
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-xs font-medium text-black">
              Actualizar Progreso:
            </label>
            <div className="flex flex-row gap-2">
              <input
                type="number"
                value={value}
                onChange={handleProgressChange}
                min="0"
                disabled={difference === 0 && !errorMessage}
                className={`max-sm:w-26 rounded-md border-2 ${
                  errorMessage ? "border-red-500" : "border-gray-300"
                } text-black ${
                  difference === 0 && !errorMessage
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
                placeholder={
                  difference === 0 && !errorMessage
                    ? "Meta alcanzada"
                    : "Ingresa tu progreso"
                }
              />
              <ButtonUtil
                label="Guardar"
                onClick={handleSaveProgress}
                disabled={value === 0 || !!errorMessage || difference === 0}
                className={`px-3 py-2 rounded-md text-sm ${
                  value === 0 || !!errorMessage || difference === 0
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between text-xs text-black">
          <span>Progreso Total: {allProgress}</span>
          <span>Restante: {formatNumberWithCommas(difference)}</span>
        </div>
        <Progress
          progress={progressBar}
          size="lg"
          color="green"
          className="animate-pulse"
        />
        <h1 className="text-center text-xs text-black">
          {completedStatus}% completado
        </h1>
      </div>
      {teamHistory.length > 0 && (
        <div className="flex flex-row justify-between p-2 bg-white rounded-md">
          <h4 className="text-sm font-semibold text-black">Historial:</h4>
          <div className="h-16 overflow-y-auto flex flex-col gap-2">
            {teamHistory.map((entry, index) => (
              <div
                key={index}
                className="text-xs text-gray-600 flex flex-row gap-2 justify-between"
              >
                <span>{entry.value}</span>
                <span>{entry.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProgress;
