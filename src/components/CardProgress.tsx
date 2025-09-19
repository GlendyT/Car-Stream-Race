import { CardProgressProps } from "@/types";
import { Progress } from "flowbite-react";
import ButtonUtil from "./ButtonUtil";
import { formatNumberWithCommas } from "@/utils/helpers";
import { FiEdit } from "react-icons/fi";

const CardProgress = ({
  teamName,
  teamGoal,
  value,
  handleProgressChange,
  allProgress,
  difference,
  progressBar,
  handleSaveProgress,
  teamHistory,
  teamImage,
  errorMessage,
  handleStartEdit,
  handleSaveEdit,
  handleCancelEdit,
  isEditing,
}: CardProgressProps) => {
  return (
    <div
      className={`flex flex-col  py-2 w-full gap-1 rounded-md text-white bg-gray-200 px-2 `}
    >
      <div className="flex flex-row  ">
        <div className="relative rounded-lg overflow-hidden">
          {teamImage && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${teamImage})`,
                filter: "blur(10px)",
              }}
            />
          )}
          <div className="relative flex flex-col p-2 backdrop-blur-sm bg-black/60  rounded-lg">
            <div className="flex flex-row justify-between text-center  ">
              <p className="text-base font-bold">{teamName}</p>
              <p className=" flex flex-row items-center gap-2 text-md font-bold">
                <span className="text-[0.5rem] text-gray-200">Goal</span>
                {formatNumberWithCommas(teamGoal)}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-[0.5rem] font-semibold">
                {isEditing ? "Edit Progress:" : "Update Progress:"}
              </label>
              <div className="flex flex-row gap-2">
                <input
                  type="number"
                  value={value}
                  onChange={handleProgressChange}
                  min="0"
                  disabled={difference === 0 && !errorMessage && !isEditing}
                  className={`w-full rounded-md border-2 backdrop-blur-3xl bg-black/10 ${
                    errorMessage
                      ? "border-red-500"
                      : isEditing
                      ? "border-blue-500"
                      : "border-gray-300"
                  }  ${
                    difference === 0 && !errorMessage && !isEditing
                      ? " backdrop-blur-lg bg-gray-800/20 text-gray-600 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder={
                    isEditing
                      ? "Edit value"
                      : difference === 0 && !errorMessage
                      ? "Goal reached"
                      : "Add progress"
                  }
                />
                {isEditing ? (
                  <>
                    <ButtonUtil
                      label="Save"
                      onClick={handleSaveEdit}
                      disabled={value === 0}
                      className={`px-3 py-2 rounded-md ${
                        value === 0
                          ? "bg-gray-900 text-gray-600 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-600"
                      }`}
                    />
                    <ButtonUtil
                      label="Cancel"
                      onClick={handleCancelEdit}
                      className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                    />
                  </>
                ) : (
                  <ButtonUtil
                    label="Save"
                    onClick={handleSaveProgress}
                    disabled={value === 0 || !!errorMessage || difference === 0}
                    className={`px-3 py-2 rounded-md  ${
                      value === 0 || !!errorMessage || difference === 0
                        ? "bg-gray-900 text-gray-100 hover:bg-gray-700 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-600"
                    }`}
                  />
                )}
              </div>
              {errorMessage && (
                <p className="text-red-100 text-xs mt-1 ">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between text-[0.6rem] text-black font-semibold">
          <span>Total Progress: {formatNumberWithCommas(allProgress)}</span>
          <span>Left: {formatNumberWithCommas(difference)}</span>
        </div>

        <Progress
          progress={Number(progressBar.toFixed(2))}
          size="lg"
          color="teal"
          className=" text-xs text-white bg-gray-400   border-2 border-gray-900 rounded-md"
          textLabel="Progress"
          labelProgress
          labelText
        />
      </div>
      {teamHistory.length > 0 && (
        <div className="flex flex-row  justify-between p-2 bg-white/50 rounded-md">
          <h4 className="text-xs font-semibold text-black">History:</h4>
          <div className="h-12  max-sm:h-10 overflow-y-auto flex flex-col gap-0">
            {teamHistory.map((entry) => (
              <div
                key={entry.id}
                className="text-[0.6rem]  text-gray-800 flex flex-row gap-2 justify-between items-center border-b"
              >
                <span>{formatNumberWithCommas(entry.value)}</span>
                <div className="flex flex-row gap-1  items-center">
                  <ButtonUtil
                    icon={<FiEdit />}
                    onClick={() => handleStartEdit(entry.id)}
                    className="px-0.5 text-black rounded text-[0.8rem] hover:text-gray-600 "
                  />
                  <span>{entry.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProgress;
