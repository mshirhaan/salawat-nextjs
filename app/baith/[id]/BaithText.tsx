import React, { useRef, useEffect, useCallback, useState } from "react";
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
import TooltipWithTouch from "@/app/salawat/[id]/TooltipWithTouch";

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
  const [userScrolled, setUserScrolled] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setLineRef = useCallback((el: HTMLDivElement | null, index: number) => {
    lineRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setUserScrolled(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setUserScrolled(false);
      }, 5000); // Reset userScrolled after 5 seconds of inactivity
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const currentLine = lines.find(
      (line) => currentTime >= line.startTime && currentTime <= line.endTime
    );

    if (currentLine && !userScrolled) {
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
  }, [currentTime, lines, controls, userScrolled]);

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
              <React.Fragment key={wordIndex}>
                <TooltipWithTouch label={word.translations.en || ""} hasArrow>
                  <Text
                    as="span"
                    display="inline"
                    cursor="pointer"
                    _hover={{ color: "red.500" }}
                    transition="color 0.3s ease"
                  >
                    {word.word}
                  </Text>
                </TooltipWithTouch>{" "}
              </React.Fragment>
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
