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
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link"; // Import Link from next/link

const NewBaithPageAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem(
      "hasSeenNewBaithPageAnnouncement"
    );
    if (!hasSeenAnnouncement) {
      setIsOpen(true);
      localStorage.setItem("hasSeenNewBaithPageAnnouncement", "true");
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
          Introducing Our New Baith Page!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" color={textColor}>
              We&apos;re thrilled to announce our new feature: The Baith Page!
            </Text>
            <Text color={textColor}>Now you can:</Text>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              <li>Explore various Baiths to uplift your spirit</li>
              <li>Recite and share your favorite Baiths</li>
              <li>Enhance your spiritual journey with easy access</li>
            </ul>
            <Text fontStyle="italic" color={headerColor}>
              Discover and recite Baiths with just one click!
            </Text>
            <VStack spacing={2} align="center" pt={4}>
              <FaBookOpen size={32} color="orange" />
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Link href="/baith" passHref>
            <Button
              onClick={onClose}
              colorScheme={buttonColorScheme}
              leftIcon={<FaBookOpen />}
            >
              Go to Baith Page
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewBaithPageAnnouncement;
