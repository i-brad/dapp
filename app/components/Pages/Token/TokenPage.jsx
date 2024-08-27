"use client";
import { TokenAbi } from "@/app/providers/abis/token";
import { TokenFactoryAbi } from "@/app/providers/abis/token-factory";
import { TokenFactory } from "@/app/providers/address";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useState } from "react";
import { MdQuestionMark } from "react-icons/md";
import { RxChevronDown } from "react-icons/rx";
import { useAccount } from "wagmi";
import SaveTokenProgress from "../../Modals/SaveTokenProgress";
import SavedTokenSuccess from "../../Modals/SavedTokenSuccess";
import PrimaryButton from "../../shared/Buttons";
import { ConnectWallet } from "../../shared/ConnectWallet";

const TokenPage = () => {
  const { isConnected, address } = useAccount();
  const toast = useToast();
  const {
    isOpen: createTokenIsOpen,
    onOpen: onCreateTokenOpen,
    onClose: onCreateTokenClose,
  } = useDisclosure();

  const {
    isOpen: successTokenIsOpen,
    onOpen: onSuccessTokenOpen,
    onClose: onSuccessTokenClose,
  } = useDisclosure();

  const [token_details, setTokenDetails] = useState({
    name: "",
    address: "",
    symbol: "",
    decimals: 0,
    supply: 0,
    hash: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const name = data.get("token_name");
    const symbol = data.get("token_symbol");
    const decimals = Number(data.get("token_decimal"));
    const supply = data.get("token_supply");
    const mintable = Boolean(Number(data.get("mintable_token")));
    const pausable = Boolean(Number(data.get("pausable_token")));
    const burnable = Boolean(Number(data.get("burnable_token")));
    const renounce_ownership = Boolean(Number(data.get("renounce_ownership")));

    // const tokenSupply = ethers.parseEther(supply);
    const tokenSupply = supply;
    const launchType = {
      mintable,
      pausable,
      burnable,
    };
    try {
      onCreateTokenOpen();
      const signer = await getEthersSigner(config);

      const factory = new ethers.Contract(
        TokenFactory,
        TokenFactoryAbi,
        signer
      );

      const byteCode = await factory.getBytecode(
        name,
        symbol,
        decimals,
        tokenSupply,
        launchType
      );

      const salt = await factory.getdeployedTokensLen(address);
      const token_address = await factory.getAddressCreate2(byteCode, salt);
      //   console.log({ token_address });

      const response = await factory.newToken(
        name,
        symbol,
        decimals,
        tokenSupply,
        launchType
      );
      //   console.log({ response });
      await response.wait();
      if (renounce_ownership && response) {
        const token = new ethers.Contract(token_address, TokenAbi, signer);

        const renounce = await token.renounceOwnership();

        // console.log({ renounce });
        if (renounce) {
          setTokenDetails({
            name,
            address: token_address,
            symbol,
            decimals,
            supply,
            hash: response?.hash || "",
          });
          onSuccessTokenOpen();
        }
      } else if (response) {
        setTokenDetails({
          name,
          address: token_address,
          symbol,
          decimals,
          supply,
          hash: response?.hash || "",
        });
        onSuccessTokenOpen();
      }
    } catch (error) {
      // console.error("Error creating token", error);

      const message = error?.message?.split("(")?.[0];
      toast({
        title: "Error creating token.",
        description: message || "FAiled",
        status: "error",
        duration: 2000,
      });
    } finally {
      handleProgressClose();
    }
  };

  const handleProgressClose = () => {
    onCreateTokenClose();
  };

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-medium lg:text-4xl">Token</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-[#272727] px-5 py-4 rounded-lg">
            <div className="py-3 border-b border-[#414040]">
              <h3 className="text-xl font-medium">Create Token</h3>
            </div>
            <div className="py-5">
              <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                  <div className="mb-1">
                    <label
                      htmlFor="token_name"
                      className="text-base text-[#FFFCFB] mb-1"
                    >
                      Token Name
                    </label>
                  </div>
                  <input
                    type="text"
                    id="token_name"
                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                    placeholder="For e.g: Awesome token"
                    name="token_name"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                  <div className="mb-1">
                    <label
                      htmlFor="token_symbol"
                      className="text-base text-[#FFFCFB] mb-1"
                    >
                      Token Symbol
                    </label>
                  </div>
                  <input
                    type="text"
                    id="token_symbol"
                    minLength={2}
                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                    placeholder="For e.g: EDU"
                    name="token_symbol"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/3">
                  <label
                    htmlFor="token_decimal"
                    className="text-base text-[#FFFCFB] mb-1"
                  >
                    Token Decimal
                  </label>
                  <input
                    type="number"
                    // pattern="/^\d*\.?\d*$/"
                    id="token_decimal"
                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                    placeholder="For e.g: 8"
                    name="token_decimal"
                    defaultValue={18}
                    // minLength={6}
                    // maxLength={18}
                    min={6}
                    max={18}
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                  <label
                    htmlFor="token_supply"
                    className="text-base text-[#FFFCFB] mb-1"
                  >
                    Total Supply
                  </label>
                  <input
                    type="number"
                    id="token_supply"
                    min={0}
                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                    // placeholder=" "
                    name="token_supply"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/3">
                  <label
                    htmlFor="blockchain"
                    className="text-base text-[#FFFCFB] mb-1"
                  >
                    Blockchain
                  </label>
                  <div className="flex items-center justify-between px-[1.625rem] w-full cursor-not-allowed text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-12 rounded-md focus:outline-0">
                    <span className="flex items-center space-x-2">
                      <Image
                        src="/svgs/open-campus.svg"
                        alt="Open Campus"
                        className="rounded-full"
                        width={24}
                        height={24}
                      />
                      <span>Open Campus</span>
                    </span>
                    <RxChevronDown />
                  </div>
                  {/* <input
                    type="text"
                    id="blockchain"
                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                    placeholder=" "
                    name="blockchain"
                    required
                    autoComplete="off"
                  /> */}
                </div>
              </div>

              <div className="relative flex flex-row flex-wrap justify-between w-full gap-3">
                <div>
                  <div className="flex items-center mb-1 ">
                    <label className="text-base text-[#FFFCFB] mr-2">
                      Mintable token
                    </label>
                    {/* <span className="bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center">
                      <MdQuestionMark size={10} />
                    </span> */}
                  </div>

                  <div>
                    <label htmlFor="mintable_token_yes" className="mr-4">
                      <input
                        type="radio"
                        id="mintable_token_yes"
                        className="mr-2"
                        value={1}
                        name="mintable_token"
                        required
                        autoComplete="off"
                      />
                      Yes
                    </label>
                    <label htmlFor="mintable_token_no">
                      <input
                        type="radio"
                        id="mintable_token_no"
                        className="mr-2"
                        defaultChecked
                        value={0}
                        name="mintable_token"
                        required
                        autoComplete="off"
                      />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-1 ">
                    <label className="text-base text-[#FFFCFB] mr-2">
                      Pausable token
                    </label>
                    {/* <span className="bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center">
                      <MdQuestionMark size={10} />
                    </span> */}
                  </div>

                  <div>
                    <label htmlFor="pausable_token_yes" className="mr-4">
                      <input
                        type="radio"
                        id="pausable_token_yes"
                        className="mr-2"
                        value={1}
                        name="pausable_token"
                        required
                        autoComplete="off"
                      />
                      Yes
                    </label>
                    <label htmlFor="pausable_token_no">
                      <input
                        type="radio"
                        id="pausable_token_no"
                        className="mr-2"
                        defaultChecked
                        value={0}
                        name="pausable_token"
                        required
                        autoComplete="off"
                      />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-1 ">
                    <label className="text-base text-[#FFFCFB] mr-2">
                      Renounce Ownership
                    </label>
                    {/* <span className="bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center">
                      <MdQuestionMark size={10} />
                    </span> */}
                  </div>

                  <div>
                    <label htmlFor="renounce_ownership_yes" className="mr-4">
                      <input
                        type="radio"
                        id="renounce_ownership_yes"
                        className="mr-2"
                        value={1}
                        name="renounce_ownership"
                        required
                        autoComplete="off"
                      />
                      Yes
                    </label>
                    <label htmlFor="renounce_ownership_no">
                      <input
                        type="radio"
                        id="renounce_ownership_no"
                        className="mr-2"
                        defaultChecked
                        value={0}
                        name="renounce_ownership"
                        required
                        autoComplete="off"
                      />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-1 ">
                    <label className="text-base text-[#FFFCFB] mr-2">
                      Burnable
                    </label>
                    {/* <span className="bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center">
                      <MdQuestionMark size={10} />
                    </span> */}
                  </div>

                  <div>
                    <label htmlFor="burnable_yes" className="mr-4">
                      <input
                        type="radio"
                        id="burnable_yes"
                        className="mr-2"
                        value={1}
                        name="burnable_token"
                        required
                        autoComplete="off"
                      />
                      Yes
                    </label>
                    <label htmlFor="burnable_no">
                      <input
                        type="radio"
                        id="burnable_no"
                        className="mr-2"
                        defaultChecked
                        value={0}
                        name="burnable_token"
                        required
                        autoComplete="off"
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="relative flex flex-row justify-between w-full gap-1">
                                <div className='flex items-center'>
                                    <label htmlFor={`mintable_token`} className="inline-flex items-center p-2 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`mintable_token`}
                                            className="mr-2 caret-[#FFA178] text-green-600 border-gray-300 w-4 h-4 rounded-lg bg-transparent"
                                            value={1}
                                            name="mintable_token"
                                            required
                                            autoComplete="off"
                                        />
                                        Mintable token
                                    </label>
                                    <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                        <MdQuestionMark size={10}/>
                                    </span>
                                </div>

                                <div className='flex items-center'>
                                    <label htmlFor={`pausable_token`} className="inline-flex items-center p-2 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`pausable_token`}
                                            className="mr-2 caret-[#FFA178] text-green-600 border-gray-300 w-4 h-4 rounded-lg bg-transparent"
                                            value={1}
                                            name="pausable_token"
                                            required
                                            autoComplete="off"
                                        />
                                        Pausable token
                                    </label>
                                    <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                        <MdQuestionMark size={10}/>
                                    </span>
                                </div>

                                <div className='flex items-center'>
                                    <label htmlFor={`renounce_ownership`} className="inline-flex items-center p-2 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`renounce_ownership`}
                                            className="mr-2 caret-[#FFA178] text-green-600 border-gray-300 w-4 h-4 rounded-lg bg-transparent"
                                            value={1}
                                            name="renounce_ownership"
                                            required
                                            autoComplete="off"
                                        />
                                        Renounce Ownership
                                    </label>
                                    <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                        <MdQuestionMark size={10}/>
                                    </span>
                                </div>

                                <div className='flex items-center'>
                                    <label htmlFor={`burnable`} className="inline-flex items-center p-2 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`burnable`}
                                            className="mr-2 caret-[#FFA178] text-green-600 border-gray-300 w-4 h-4 rounded-lg bg-transparent"
                                            value={1}
                                            name="burnable"
                                            required
                                            autoComplete="off"
                                        />
                                        Burnable
                                    </label>
                                    <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                        <MdQuestionMark size={10}/>
                                    </span>
                                </div>
                                    

                            </div> */}
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-4">
            {isConnected ? (
              <button
                className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px]  whitespace-nowrap 
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base text-white block"
              >
                Create Token
              </button>
            ) : (
              <div className="relative flex items-center max-w-[200px] mx-auto justify-center z-[999] ">
                <ConnectWallet>
                  <PrimaryButton
                    text="Connect wallet"
                    as="span"
                    className="w-fit"
                  />
                </ConnectWallet>
              </div>
            )}
          </div>
        </form>
      </div>

      <SaveTokenProgress
        isOpen={createTokenIsOpen}
        onClose={onCreateTokenClose}
        handleProgressClose={handleProgressClose}
      />

      <SavedTokenSuccess
        details={token_details}
        isOpen={successTokenIsOpen}
        onClose={onSuccessTokenClose}
      />
    </>
  );
};

export default TokenPage;
