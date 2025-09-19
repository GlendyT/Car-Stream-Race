import Image from "next/image";
import { CarsProps } from "@/types";
import useRace from "@/hooks/useRace";

const Cars = ({

  color1 = "hsl(44deg 100% 50%)",
  color2 = "hsl(44deg 100% 50%)",
  car1,
  car2,
}: CarsProps) => {
  const {
    svgRef,
    path1Ref,
    path2Ref,
    car1ImageRef,
    car1CircleRef,
    car2ImageRef,
    car2CircleRef,
  } = useRace();

  return (
    <div className="relative h-full w-96">
      <svg
        id="svg"
        ref={svgRef}
        viewBox="0 0 200 700"
        className={`overflow-visible h-full w-full border-dotted   `}
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="1" dy="4" result="offset" />
            <feFlood floodColor="#b29201" floodOpacity="1" />
            <feComposite in2="offset" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          id="path1"
          ref={path1Ref}
          stroke={color1}
          strokeWidth={4}
          fill="none"
        />
        <path
          id="path2"
          ref={path2Ref}
          stroke={color2}
          strokeWidth={4}
          fill="none"
        />
        {!car1 && <circle ref={car1CircleRef} r={10} fill={color1} />}
        {!car2 && <circle ref={car2CircleRef} r={10} fill={color2} />}
      </svg>
      {/* Carro 1 */}
      {car1 && (
        <div
          ref={car1ImageRef}
          className="absolute pointer-events-none "
          style={{
            width: "35px",
            height: "50px",
            transform: "translate(-10px, -10px)",
          }}
        >
          <Image
            src={car1}
            alt="Car 1"
            width={100}
            height={20}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      {/* Carro 2 */}
      {car2 && (
        <div
          ref={car2ImageRef}
          className="absolute pointer-events-none"
          style={{
            width: "35px",
            height: "50px",
            transform: "translate(-10px, -10px)",
          }}
        >
          <Image
            src={car2}
            alt="Car 2"
            width={100}
            height={10}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

    </div>
  );
};

export default Cars;
