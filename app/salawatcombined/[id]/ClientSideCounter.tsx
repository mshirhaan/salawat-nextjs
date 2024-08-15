// app/salawat/[id]/ClientSideCounter.tsx
'use client';

import { useState } from 'react';
import { Box, Button, Text } from "@chakra-ui/react";

export default function ClientSideCounter() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <Box
      position="fixed"
      bottom={{ base: "10%", md: "5%" }}
      left="50%"
      transform="translateX(-50%)"
      textAlign="center"
      zIndex={1}
      width="full"
      display="flex"
      justifyContent="center"
    >
      <Button
        onClick={handleCount}
        size="lg"
        colorScheme="teal"
        variant="solid"
        borderRadius="full"
        width="90px"
        height="90px"
        boxShadow="md"
        _hover={{ bg: "teal.600" }}
        _focus={{ boxShadow: "outline" }}
        transition="background-color 0.3s ease, transform 0.3s ease"
        _active={{ transform: "scale(0.95)" }}
        fontSize="xl"
        fontWeight="bold"
      >
        <Text color="white">{count}</Text>
      </Button>
    </Box>
  );
}