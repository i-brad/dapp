"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";

export const ConnectWallet = ({ children }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="w-full"
                  >
                    {children}
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="text-red-500 text-[0.625rem] md:text-xs whitespace-nowrap border w-full border-neutral-800 rounded-2xl md:px-4 p-2 md:py-[0.6875rem] bg-eerie-black-3"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div
                  style={{ display: "flex", gap: 10, alignItems: "center" }}
                  className="text-white text-[0.625rem] md:text-xs border md:px-4 bg-eerie-black-3 rounded-2xl border-neutral-800 p-[0.375rem] md:py-[0.6875rem]"
                >
                  <button
                    onClick={openChainModal}
                    style={{
                      display: chain.hasIcon ? "flex" : "none",
                      alignItems: "center",
                    }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 26,
                          height: 26,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={26}
                            height={26}
                          />
                        )}
                      </div>
                    )}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[6rem]"
                  >
                    {account.displayName}
                  </button>
                  <span>
                    <MdKeyboardArrowDown size={18} />
                  </span>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
