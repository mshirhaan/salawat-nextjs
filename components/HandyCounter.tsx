// components/HandyCounter.tsx
'use client';
import { useState, useEffect } from "react";
import { Button, VStack, Text, HStack } from "@chakra-ui/react";

interface HandyCounterProps {
  initialCount?: number;
}

export default function HandyCounter({ initialCount = 0 }: HandyCounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Load count from localStorage on component mount
    const storedCount = localStorage.getItem('handyCounter');
    if (storedCount !== null) {
      setCount(parseInt(storedCount, 10));
    }
  }, []);

  useEffect(() => {
    // Save count to localStorage whenever it changes
    localStorage.setItem('handyCounter', count.toString());
  }, [count]);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="4xl" fontWeight="bold">{count}</Text>
      <HStack spacing={4}>
        <Button onClick={incrementCount} colorScheme="teal" size="lg">
          Increment
        </Button>
        <Button onClick={resetCount} colorScheme="red" size="lg">
          Reset
        </Button>
      </HStack>
    </VStack>
  );
}