"use client";
import useTeams from "@/hooks/useTeams";
import { montserrat } from "@/utils/helpers";
import Image from "next/image";
import Partido from "./match/Partido";

const Index = () => {
  const {
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
      className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center ${montserrat.className} `}
    >

      <Partido /> 
    </section>
  );
};

export default Index;
