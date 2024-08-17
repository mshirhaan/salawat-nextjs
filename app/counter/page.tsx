"use client";

import { Box, Button, VStack, Text, Flex, Heading, IconButton, useToast } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SalawatPage({ params }: { params: { id: string } }) {
  const [count, setCount] = useState(0);
  const toast = useToast();
  const router = useRouter();

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
    setCount((prevCount) => prevCount + 1);
  };

  const resetCount = () => {
    setCount(0);
    toast({
      title: "Counter Reset",
      description: "Your count has been reset to 0.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
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
        <Heading color="white" marginTop="8" fontSize={{ base: "2xl", md: "4xl" }}>
          Salawat Counter
        </Heading>

        <VStack spacing={8}>
          <Text fontSize={{ base: "5xl", md: "6xl" }} fontWeight="bold" color="white">
            {count}
          </Text>
        </VStack>

        <Flex 
          direction="column" 
          alignItems="center" 
          width="full" 
          marginBottom="8"
          position="relative"
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
            mb={4}
          >
            Count
          </Button>
          <Flex width="full" justifyContent="space-between" mt={4}>
            <IconButton
              aria-label="Reset counter"
              icon={<RepeatIcon />}
              onClick={resetCount}
              colorScheme="red"
              variant="solid"
              size="lg"
            />
            <Button
              onClick={() => router.push('/')}
              colorScheme="gray"
              variant="solid"
              size="lg"
            >
              Back to Home
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}