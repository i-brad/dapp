import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import detectEthereumProvider from "@metamask/detect-provider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CopyIcon } from "../IconComponent";

const SavedTokenSuccess = ({ details, isOpen, onClose }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleClose = (e) => {
    onClose();
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(details?.address);
    toast({ title: "Address Copied.", status: "success", duration: 1000 });
  };

  const addToken = async () => {
    setLoading(true);

    try {
      const provider = await detectEthereumProvider();
      if (!provider) {
        toast({
          message: "Please install metamask to proceed",
          status: "error",
          duration: 1000,
        });
        return;
      }

      // await provider.request({
      //   method: "eth_requestAccounts",
      // });

      await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: details?.address,
            symbol: details?.symbol,
            decimals: details?.decimals,
          },
        },
      });
    } catch (error) {
      console.error("Error adding token:", error);
      toast({
        message: "Unable to add the token",
        status: "error",
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay
          bg={"#272727E5"}
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent className="bg-[#303030] text-white min-h-[500px] py-[25px] rounded-2xl">
          <ModalCloseButton
            autoFocus={false}
            className="focus:ring-0 focus:outline-none"
          />
          <ModalBody>
            <div className="py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-center w-full">
                  <div className="w-44 h-44 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                    <Image
                      src={"/svgs/success.svg"}
                      alt={"fall-back"}
                      width={76}
                      height={76}
                      className="rounded-t-[16px] w-full h-full object-cover object-center"
                      priority
                    />
                  </div>
                </div>
                {details?.address ? (
                  <div className="space-y-2 text-center">
                    <p className="text-[#A9A4A2] text-sm">Token Address</p>
                    <h3 className="text-base font-medium">
                      {details?.address}
                    </h3>
                    <button
                      onClick={copyHandler}
                      className="text-[15px] text-[#B3AFAD] inline-flex items-center gap-1"
                    >
                      <span className="text-[#FFA178]">
                        <CopyIcon size={12} />
                      </span>
                      Copy
                    </button>
                  </div>
                ) : null}

                <div className="w-full px-2 mb-5">
                  <div className="p-2">
                    <h3 className="text-base font-medium text-white">
                      Token details
                    </h3>
                  </div>
                  <div className="bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-4">
                    <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                      <h3 className=" font-medium text-[#898582] text-sm">
                        Token name
                      </h3>
                      <span className="font-medium text-[#FFFFFF] text-sm">
                        {details?.name || "~"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                      <h3 className="font-medium text-[#898582] text-sm">
                        Token symbol
                      </h3>
                      <span className="font-medium text-[#FFFFFF] text-sm">
                        {details?.symbol || "~"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                      <h3 className="font-medium text-[#898582] text-sm">
                        Token decimal
                      </h3>
                      <span className="font-medium text-[#FFFFFF] text-sm">
                        {details?.decimals || "~"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                      <h3 className="font-medium text-[#898582] text-sm">
                        Total supply
                      </h3>
                      <span className="font-medium text-[#FFFFFF] text-sm">
                        {Number(details?.supply || 0)?.toLocaleString() || "~"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                      <h3 className="font-medium text-[#898582] text-sm">
                        Blockchain
                      </h3>
                      <span className="flex items-center space-x-2 text-sm font-medium text-white">
                        <Image
                          src="/svgs/open-campus.svg"
                          alt="Open Campus"
                          className="rounded-full"
                          width={24}
                          height={24}
                        />
                        <span>Open Campus</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-3">
                  <button
                    type="button"
                    onClick={addToken}
                    disabled={loading}
                    className="flex items-center justify-center space-x-2 border border-[#DA5921] hover:bg-[#DA5921] w-full whitespace-nowrap 
                            disabled:opacity-50 disabled:cursor-progress rounded-lg 
                            transition-all duration-75 px-5 
                            font-medium p-3 text-sm text-[#DA5921] hover:text-white"
                  >
                    <Image
                      src="/svgs/meta-mask.svg"
                      alt="Metamask"
                      width={26.7}
                      height={26}
                    />
                    <span>
                      {loading ? "Adding to Metamask" : "Add to Metamask"}
                    </span>
                  </button>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_EXPLORER}/tx/${details?.hash}`}
                    className="bg-[#DA5921] text-center hover:bg-[#DA5921] w-full whitespace-nowrap rounded-lg transition-all duration-75 border-none px-5 font-medium p-3 text-sm text-white block"
                  >
                    View on Explorer
                  </Link>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SavedTokenSuccess;
