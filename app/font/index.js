import localFont from "next/font/local";

export const GeneralSansFont = localFont({
  src: [
    {
      path: "./GeneralSans/GeneralSans-Bold.ttf",
      weight: "700",
    },
    {
      path: "./GeneralSans/GeneralSans-Semibold.ttf",
      weight: "600",
    },
    {
      path: "./GeneralSans/GeneralSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "./GeneralSans/GeneralSans-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-sans",
});
