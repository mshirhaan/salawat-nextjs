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
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const DarkModeAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem(
      "hasSeenDarkModeAnnouncement"
    );
    if (!hasSeenAnnouncement) {
      setIsOpen(true);
      localStorage.setItem("hasSeenDarkModeAnnouncement", "true");
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
          Introducing Dark Mode!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" color={textColor}>
              We&apos;re excited to announce our new feature: Dark Mode!
            </Text>
            <Text color={textColor}>Now you can:</Text>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              <li>Switch between light and dark themes</li>
              <li>Reduce eye strain during nighttime use</li>
              <li>Enjoy a sleek, modern interface</li>
            </ul>
            <Text fontStyle="italic" color={headerColor}>
              Customize your experience with just one click!
            </Text>
            <VStack spacing={2} align="center" pt={4}>
              <SunIcon w={8} h={8} color="orange.400" />
              <MoonIcon w={8} h={8} color="blue.400" />
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            colorScheme={buttonColorScheme}
            leftIcon={<MoonIcon />}
          >
            Try Dark Mode
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DarkModeAnnouncement;
