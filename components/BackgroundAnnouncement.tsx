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
import Image from "next/image";

const BackgroundAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem(
      "hasSeenBackgroundAnnouncement"
    );
    if (!hasSeenAnnouncement) {
      setIsOpen(true);
      localStorage.setItem("hasSeenBackgroundAnnouncement", "true");
    }
  }, []);

  const onClose = () => setIsOpen(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const headerColor = useColorModeValue("blue.600", "blue.300");
  const buttonColorScheme = useColorModeValue("blue", "gray");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader color={headerColor} fontSize="2xl" fontWeight="bold">
          New Background Customization!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* Screenshot */}
            <Image
              src="/BgColor.png" // Update with your image path
              alt="Background Toggle Feature"
              className="rounded-lg"
              width={500} // Adjust width as necessary
              height={300} // Adjust height as necessary
            />
            <Text fontSize="lg" color={textColor}>
              We&apos;ve added a new feature to customize your background!
            </Text>
            <Text color={textColor}>Now you can:</Text>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              <li>Select a static background color of your choice.</li>
              <li>Switch between dynamic image backgrounds or solid colors.</li>
              <li>
                Use the settings panel to adjust the background to fit your
                mood.
              </li>
            </ul>
            <Text fontStyle="italic" color={headerColor}>
              Make your app experience truly personal!
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            colorScheme={buttonColorScheme}
            leftIcon={<InfoIcon />}
          >
            Explore Background Options
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BackgroundAnnouncement;
