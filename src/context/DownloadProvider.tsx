"use client";

import { DownloadContextType, TeamsProviderProps } from "@/types";
import html2canvas from "html2canvas-pro";
import { createContext } from "react";

export const DownloadContext = createContext<DownloadContextType>(null!);

export const DownloadProvider = ({ children }: TeamsProviderProps) => {
  const handleDownloadImage = async () => {
    const element = document.getElementById("print");

    if (!element) {
      return;
    }
    await document.fonts.ready;

    const options = {
      scale: 2,
      allowTaint: true,
      backgroundColor: null,
      height: element.offsetHeight,
    };
    const canvas = await html2canvas(element, options);
    const data = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = data;
    link.download = "MONOHOBI";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DownloadContext.Provider value={{ handleDownloadImage }}>
      {children}
    </DownloadContext.Provider>
  );
};