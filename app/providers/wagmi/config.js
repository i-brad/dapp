import { getDefaultConfig, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { argentWallet, ledgerWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { cookieStorage, createStorage, http } from "wagmi";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { wallets } = getDefaultWallets();

export const educhain = {
    id: 656476,
    name: "EDUCHAIN",
    iconUrl: "https://www.thrustpad.finance/images/logo2.svg",
    iconBackground: "#fff",
    nativeCurrency: { name: "EDUCHAIN", symbol: "EDU", decimals: 18 },
    rpcUrls: {
        default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
    },
    blockExplorers: {
        default: {
            name: "Blockscout",
            url: "https://opencampus-codex.blockscout.com",
        },
    },
};

export const config = getDefaultConfig({
    appName: "Thrustpad",
    projectId,
    chains: [educhain],
    transports: {
        [educhain.id]: http("https://rpc.open-campus-codex.gelato.digital"),
    },
    wallets: [
        ...wallets,
        {
            groupName: "Others",
            wallets: [argentWallet, trustWallet, ledgerWallet],
        },
    ],
    ssr: true, // If your dApp uses server side rendering (SSR)
    storage: createStorage({
        storage: cookieStorage,
    }),
});
