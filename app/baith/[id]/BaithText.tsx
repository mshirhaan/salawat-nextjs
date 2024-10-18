import React, { useRef, useEffect, useCallback } from "react";
import {
  VStack,
  Text,
  Tooltip,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import dynamic from "next/dynamic";
import { Line } from "../data";

const FloatingHearts = dynamic(() => import("./FloatingHearts"), {
  ssr: false,
});

// Define types
type Props = {
  lines: Line[];
  currentTime: number;
};

export const BaithText: React.FC<Props> = ({ lines, currentTime }) => {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();

  const setLineRef = useCallback((el: HTMLDivElement | null, index: number) => {
    lineRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const currentLine = lines.find(
      (line) => currentTime >= line.startTime && currentTime <= line.endTime
    );

    if (currentLine) {
      const index = lines.indexOf(currentLine);
      lineRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      controls.start({
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.8],
        transition: { duration: 2, times: [0, 0.1, 0.9, 1] },
      });
    }
  }, [currentTime, lines, controls]);

  // Color mode values
  const activeBgColor = useColorModeValue("green.100", "green.700"); // Light mode vs Dark mode background
  const inactiveBgColor = useColorModeValue("transparent", "transparent"); // Transparent for both modes
  const textColor = useColorModeValue("gray.800", "gray.200"); // Text color for light and dark mode

  return (
    <VStack spacing={4} align="stretch">
      {lines.map((line, index) => (
        <Box
          key={index}
          ref={(el) => setLineRef(el, index)}
          p={4}
          borderRadius="md"
          bg={
            currentTime >= line.startTime && currentTime <= line.endTime
              ? activeBgColor
              : inactiveBgColor
          }
          position="relative"
        >
          <Text
            fontSize="2rem"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            color={textColor} // Apply text color based on mode
          >
            {line.words.map((word, wordIndex) => (
              <Tooltip
                key={wordIndex}
                label={word.translations.en}
                placement="top"
              >
                <Text as="span" cursor="pointer" _hover={{ color: "red.500" }}>
                  {word.word}{" "}
                </Text>
              </Tooltip>
            ))}
          </Text>
          <Text fontSize="md" textAlign="center" color={textColor}>
            {line.translations.en}
          </Text>
          {currentTime >= line.startTime && currentTime <= line.endTime && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              pointerEvents="none"
            >
              <FloatingHearts />
            </Box>
          )}
        </Box>
      ))}
    </VStack>
  );
};
