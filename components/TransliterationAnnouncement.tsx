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

const TransliterationAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem(
      "hasSeenTransliterationAnnouncement"
    );
    if (!hasSeenAnnouncement) {
      setIsOpen(true);
      localStorage.setItem("hasSeenTransliterationAnnouncement", "true");
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
          New Transliteration Feature!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" color={textColor}>
              We&apos;re excited to introduce our new Transliteration feature!
            </Text>
            <Text color={textColor}>Now you can:</Text>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              <li>
                Read Salawat in Arabic with proper pronunciation even if
                you&apos;re unfamiliar with the script
              </li>
              <li>Enhance your recitation experience</li>
              <li>
                You can hide or show it from the settings by clicking on the
                settings icon in top right
              </li>
            </ul>
            <Text fontStyle="italic" color={headerColor}>
              Customize your learning experience with ease!
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            colorScheme={buttonColorScheme}
            leftIcon={<InfoIcon />}
          >
            Explore Transliteration
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransliterationAnnouncement;
