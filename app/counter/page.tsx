"use client";

import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
  Heading,
  IconButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

export default function SalawatPage({ params }: { params: { id: string } }) {
  const [count, setCount] = useState(0);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const storedCount = localStorage.getItem("salawatCounter");
    if (storedCount !== null) {
      setCount(parseInt(storedCount, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("salawatCounter", count.toString());
  }, [count]);

  const incrementCount = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setCount((prevCount) => prevCount + 1);
  };

  const confirmReset = () => {
    setCount(0);
    toast({
      title: "Counter Reset",
      description: "Your count has been reset to 0.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box position="relative" height="calc(100vh - 64px)" overflow="hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        src="https://cdn.pixabay.com/video/2024/01/26/198164-906869460_large.mp4"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        background="rgba(0, 0, 0, 0.3)"
        zIndex={0}
      />

      <Flex
        position="relative"
        zIndex={1}
        height="100%"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        padding="4"
      >
        <Heading
          color="white"
          marginTop="8"
          fontSize={{ base: "2xl", md: "4xl" }}
        >
          Salawat Counter
        </Heading>

        <VStack spacing={8}>
          <Text
            fontSize={{ base: "5xl", md: "6xl" }}
            fontWeight="bold"
            color="white"
          >
            {count}
          </Text>
        </VStack>

        <Flex
          direction="column"
          alignItems="center"
          width="full"
          marginBottom="8"
        >
          <Button
            onClick={incrementCount}
            size="lg"
            colorScheme="teal"
            variant="solid"
            borderRadius="full"
            width={{ base: "24", md: "32" }}
            height={{ base: "24", md: "32" }}
            boxShadow="lg"
            _hover={{ bg: "teal.600" }}
            _focus={{ boxShadow: "outline" }}
            transition="all 0.3s ease"
            _active={{ transform: "scale(0.95)" }}
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
          >
            Count
          </Button>
        </Flex>
      </Flex>

      {/* Move the reset button to the bottom right corner */}
      <IconButton
        aria-label="Reset counter"
        icon={<RepeatIcon />}
        onClick={onOpen}
        colorScheme="red"
        variant="solid"
        size="lg"
        position="fixed"
        bottom="4"
        right="4"
        boxShadow="lg"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reset Counter
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmReset} ml={3}>
                Reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
