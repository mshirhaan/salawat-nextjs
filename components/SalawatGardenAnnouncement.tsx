import React, { useState, useEffect } from "react";
import {
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";

const SalawatGardenAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem(
      "hasSeenSalawatGardenAnnouncement1"
    );
    if (!hasSeenAnnouncement) {
      setIsOpen(true);
      localStorage.setItem("hasSeenSalawatGardenAnnouncement1", "true");
    }
  }, []);

  const onClose = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-2xl font-bold text-green-700">
          Introducing Salawat Garden!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Image
              src="/SalawatGarden.png"
              alt="Salawat Garden"
              className="rounded-lg"
              width={500}
              height={500}
            />
            <Text className="text-lg">
              We&apos;re excited to announce our new feature: Salawat Garden!
            </Text>
            <Text>Now you can:</Text>
            <ul className="list-disc pl-5">
              <li>
                Buy plants from our store using points earned from your
                recitations
              </li>
              <li>Plant and nurture your virtual garden</li>
              <li>
                Watch your garden grow as you progress in your spiritual journey
              </li>
            </ul>
            <Text className="italic text-green-600">
              Increase your Salawat, grow your garden!
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Start Gardening
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SalawatGardenAnnouncement;
