import { Montserrat } from "next/font/google";

//todo: Fonts Polaroid
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function formatNumberWithCommas(quantity: number) {
  return new Intl.NumberFormat("en-US").format(quantity);
}
