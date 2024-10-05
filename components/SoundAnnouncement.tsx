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
  useColorModeValue,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const SoundAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem(
      "hasSeenSoundAnnouncement"
    );
    if (!hasSeenAnnouncement) {
      setIsOpen(true);
      localStorage.setItem("hasSeenSoundAnnouncement", "true");
    }
  }, []);

  const onClose = () => setIsOpen(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const headerColor = useColorModeValue("teal.600", "teal.300");
  const buttonColorScheme = useColorModeValue("teal", "gray");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader color={headerColor} fontSize="2xl" fontWeight="bold">
          New Sound Feature!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" color={textColor}>
              We&apos;re thrilled to introduce our new Sound feature!
            </Text>
            <Text color={textColor}>Now you can:</Text>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              <li>Enjoy sound notifications for each Salawat recitation.</li>
              <li>Enhance your engagement with auditory feedback.</li>
              <li>
                You can toggle sound on or off from the settings by clicking on
                the settings icon in the top right.
              </li>
            </ul>
            <Text fontStyle="italic" color={headerColor}>
              Customize your recitation experience with sound!
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            colorScheme={buttonColorScheme}
            leftIcon={<InfoIcon />}
          >
            Explore Sound Features
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SoundAnnouncement;
