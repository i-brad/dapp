import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const SavePresalesProgress = ({ isOpen, onClose, handleProgressClose }) => {
  // const handleClose = (e) => {
  //     console.log('here')
  //     onClose();
  // }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay
          bg={"#272727E5"}
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent className="bg-[#303030] text-white min-h-[400px] py-[25px] px-6 rounded-2xl">
          <ModalHeader className="text-center py-3 border-b border-[#414040]">
            Creating Presale
          </ModalHeader>
          <ModalBody>
            <div className="px-5 py-4">
              <div className="flex items-center h-full w-full justify-center py-12 text-center flex-col">
                <div className="w-44 h-44 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                  <Image
                    src={"/images/loader.gif"}
                    alt={"fall-back"}
                    fill
                    className="rounded-t-[16px] w-full h-full object-cover object-center"
                    priority
                  />
                </div>

                <p className="text-xl text-[#898582] mt-3 font-medium ">
                  Get ready to moon 🚀
                </p>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SavePresalesProgress;
