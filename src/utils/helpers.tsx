import { Montserrat } from "next/font/google";

//todo: Fonts Polaroid
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function formatNumberWithCommas(quantity: number) {
  return new Intl.NumberFormat("en-US").format(quantity);
}


export const anchors1 = [
  { x: 100, y: 650 },
  { x: 160, y: 550 },
  { x: 120, y: 450 },
  { x: 180, y: 350 },
  { x: 140, y: 250 },
  { x: 170, y: 150 },
  { x: 150, y: 50 },
];
export const anchors2 = [
  { x: 10, y: 650 },
  { x: 10, y: 550 },
  { x: 80, y: 450 },
  { x: 20, y: 350 },
  { x: 60, y: 250 },
  { x: 30, y: 150 },
  { x: 50, y: 50 },
];