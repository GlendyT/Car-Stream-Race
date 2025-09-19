"use client";

import { RaceContextType, RaceProviderProps } from "@/types";
import { anchors1, anchors2 } from "@/utils/helpers";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { createContext, useEffect, useRef, useState } from "react";

const RaceContext = createContext<RaceContextType>(null!);

const RaceProvider = ({
  children,
  progress1 = 0,
  progress2 = 0,
  color1 = "hsl(44deg 100% 50%)",
  color2 = "hsl(44deg 100% 50%)",
  car1,
  car2,
}: RaceProviderProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const car1ImageRef = useRef<HTMLDivElement>(null);
  const car1CircleRef = useRef<SVGCircleElement>(null);
  const car2ImageRef = useRef<HTMLDivElement>(null);
  const car2CircleRef = useRef<SVGCircleElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  // Guardar el progreso anterior de cada auto
  const prevProgress1 = useRef<number>(0);
  const prevProgress2 = useRef<number>(0);

  // Inicializa los paths y los anchors
  useEffect(() => {
    if (!svgRef.current || !path1Ref.current || !path2Ref.current) return;

    gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);

    const timer = setTimeout(() => {
      try {
        const rawPath1 = MotionPathPlugin.arrayToRawPath(anchors1, {
          curviness: 0.5,
        });
        const rawPath2 = MotionPathPlugin.arrayToRawPath(anchors2, {
          curviness: 0.5,
        });

        if (path1Ref.current) {
          path1Ref.current.setAttribute(
            "d",
            MotionPathPlugin.rawPathToString(rawPath1)
          );
        }
        if (path2Ref.current) {
          path2Ref.current.setAttribute(
            "d",
            MotionPathPlugin.rawPathToString(rawPath2)
          );
        }

        // Coloca los anchors como <circle>
        const svg = svgRef.current;
        if (svg) {
          svg.querySelectorAll("circle.anchor").forEach((c) => c.remove());

          anchors1.forEach((anchor, index) => {
            const circle = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );
            circle.setAttribute("cx", anchor.x.toString());
            circle.setAttribute("cy", anchor.y.toString());
            circle.setAttribute("r", "10");
            circle.setAttribute("fill", "hsl(44deg 100% 50%)");
            circle.setAttribute("filter", "url(#shadow)");
            circle.setAttribute("class", "anchor");
            svg.appendChild(circle);

            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            text.setAttribute("x", anchor.x.toString());
            text.setAttribute("y", anchor.y.toString());
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "central");
            text.setAttribute("fill", "black");
            text.setAttribute("font-size", "12");
            text.setAttribute("font-weight", "bold");
            text.textContent = (index + 1).toString();
            svg.appendChild(text);
          });

          anchors2.forEach((anchor, index) => {
            const circle = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );
            circle.setAttribute("cx", anchor.x.toString());
            circle.setAttribute("cy", anchor.y.toString());
            circle.setAttribute("r", "10");
            circle.setAttribute("fill", "hsl(44deg 100% 50%)");
            circle.setAttribute("filter", "url(#shadow)");
            circle.setAttribute("class", "anchor");
            svg.appendChild(circle);

            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            text.setAttribute("x", anchor.x.toString());
            text.setAttribute("y", anchor.y.toString());
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "central");
            text.setAttribute("fill", "black");
            text.setAttribute("font-size", "12");
            text.setAttribute("font-weight", "bold");
            text.textContent = (index + 1).toString();
            svg.appendChild(text);
          });

          // Aplicar strokeDasharray directamente
          if (path1Ref.current) {
            path1Ref.current.setAttribute("stroke-dasharray", "15");
          }
          if (path2Ref.current) {
            path2Ref.current.setAttribute("stroke-dasharray", "15");
          }

          setIsInitialized(true);
        }

        // Resetear progreso previo al montar
        prevProgress1.current = 0;
        prevProgress2.current = 0;
      } catch (error) {
        console.error("Error initializing Cars component:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [color1, color2]);

  // Animar car1 cuando cambie progress1
  useEffect(() => {
    if (!isInitialized || !path1Ref.current) return;
    const currentRef = car1 ? car1ImageRef.current : car1CircleRef.current;
    if (!currentRef) return;
    const start = Math.max(0, Math.min(1, prevProgress1.current));
    const end = Math.max(0, Math.min(1, progress1));
    gsap.to(currentRef, {
      duration: 1.2,
      motionPath: {
        path: path1Ref.current,
        align: path1Ref.current,
        alignOrigin: [0.5, 0.5],
        start,
        end,
        autoRotate: false,
      },
      ease: "power1.inOut",
      onComplete: () => {
        prevProgress1.current = end;
      },
    });
  }, [progress1, isInitialized, car1]);

  // Animar car2 cuando cambie progress2
  useEffect(() => {
    if (!isInitialized || !path2Ref.current) return;
    const currentRef = car2 ? car2ImageRef.current : car2CircleRef.current;
    if (!currentRef) return;
    const start = Math.max(0, Math.min(1, prevProgress2.current));
    const end = Math.max(0, Math.min(1, progress2));
    gsap.to(currentRef, {
      duration: 1.2,
      motionPath: {
        path: path2Ref.current,
        align: path2Ref.current,
        alignOrigin: [0.5, 0.5],
        start,
        end,
        autoRotate: false,
      },
      ease: "power1.inOut",
      onComplete: () => {
        prevProgress2.current = end;
      },
    });
  }, [progress2, isInitialized, car2]);
  return (
    <RaceContext.Provider
      value={{
        svgRef,
        path1Ref,
        path2Ref,
        car1ImageRef,
        car1CircleRef,
        car2ImageRef,
        car2CircleRef,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export { RaceProvider };
export default RaceContext;
