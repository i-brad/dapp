import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Providers } from "./providers/Providers";
import { GeneralSansFont } from "./font";
import Sidebar from "./components/Layout/Sidebar";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { WagProvider } from "./providers/wagmi";
import { headers } from "next/headers";

export const metadata = {
    title: {
        template: "Thrustpad ILO - %s",
        default: "Thrustpad ILO",
    },
    keyword: ["ThrustPad", "Educhain Launchpad", "Launchpad", "Initial Liquidity Offering", "ILO"],
    description:
        "At Thrustpad, we help raise funds for Initial Liquidity Offerings (ILOs) to provide the necessary liquidity for new projects.",
    openGraph: {
        siteName: "Thrustpad",
        url: "https://www.thrustpad.finance",
        images: [
            {
                url: "https://www.thrustpad.finance/images/og.png",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({ children }) {
    const cookie = headers().get("cookie");
    return (
        <html lang="en">
            <body
                className={`${GeneralSansFont.variable} ${GeneralSansFont.className}`}
                suppressHydrationWarning={true}
            >
                <Providers>
                    <WagProvider cookie={cookie}>
                        <div className="h-screen flex flex-row justify-start bg-[#212121] text-white">
                            <Sidebar />
                            <div className="flex-1 h-full overflow-y-auto scrollbar-change">
                                <main className="main-wrapper ">
                                    <Navbar />
                                    <div className="container h-full py-2 lg:py-4 px-4 lg:px-4 mx-auto ">
                                        {children}
                                    </div>
                                    <Footer />
                                </main>
                            </div>
                        </div>
                    </WagProvider>
                </Providers>
            </body>
        </html>
    );
}
