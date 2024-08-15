"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  Tooltip,
  Select,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect, ReactNode } from "react";
import Draggable from "react-draggable";

interface SalawatWord {
  word: string;
  translations: { [key: string]: string };
}

interface SalawatLine {
  arabic: string;
  translations: { [key: string]: string };
  words: SalawatWord[];
}

interface SalawatData {
  title: string;
  lines: SalawatLine[];
}

export default function SalawatPage({ params }: { params: { id: string } }) {
  const [salawat, setSalawat] = useState<SalawatData | null>(null);
  const [count, setCount] = useState(0);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    async function fetchSalawat() {
      const response = await fetch(`/api/salawat/${params.id}`);
      const data = await response.json();
      setSalawat(data);
    }

    fetchSalawat();
  }, [params.id]);

  const handleCount = () => {
    // Vibration feedback
    if (navigator.vibrate) {
      navigator.vibrate(100); // Vibrate for 100 milliseconds
    }
    setCount(count + 1);
  };

  const renderArabicTextWithTooltips = (
    arabicText: string,
    words: SalawatWord[]
  ) => {
    const wordMap = new Map(
      words.map((word) => [word.word, word.translations[language] || ""])
    );

    return arabicText.split(" ").map((word, index) => (
      <TooltipWithTouch key={index} label={wordMap.get(word) || ""} hasArrow>
        <Text
          as="span"
          mx={1}
          display="inline"
          fontFamily="'Amiri', serif"
          fontSize="lg"
          cursor="pointer"
          _hover={{ color: "teal.500" }}
          transition="color 0.3s ease"
        >
          {word}
        </Text>
      </TooltipWithTouch>
    ));
  };

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="https://cdn.pixabay.com/video/2022/03/30/112361-694236354_large.mp4"
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

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        background="rgba(0, 0, 0, 0.5)" // Semi-transparent overlay
        zIndex={0}
      />

      {/* Content */}
      <Box position="relative" zIndex={1} p={5}>
        {salawat ? (
          <>
            <Heading as="h2" size="lg" mb={6} textAlign="center" color="white">
              {salawat.title}
            </Heading>
            <Stack spacing={4} mb={6} align="center">
              <Select
                width="auto"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                variant="outline"
                placeholder="Select Language"
                size="lg"
                color="white"
                borderColor="white"
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </Select>
            </Stack>
            {salawat.lines.map((line, index) => (
              <Box key={index} mb={6}>
                <Text
                  mb={4}
                  fontFamily="'Amiri', serif"
                  fontSize="lg"
                  textAlign="center"
                  color="white"
                >
                  {renderArabicTextWithTooltips(line.arabic, line.words)}
                </Text>
                <Text mb={4} fontSize="md" color="gray.200" textAlign="center">
                  {line.translations[language]}
                </Text>
                {index < salawat.lines.length - 1 && (
                  <Divider my={4} borderColor="gray.200" />
                )}
              </Box>
            ))}

            {/* Improved Button */}
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
                onTouchStart={handleCount}
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
          </>
        ) : (
          <Text textAlign="center" color="white">
            Loading...
          </Text>
        )}
      </Box>
    </Box>
  );
}

const TooltipWithTouch = ({
  children,
  ...restToolTipProps
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  return (
    <Tooltip isOpen={isLabelOpen} {...restToolTipProps} placement="top">
      <span
        onMouseEnter={() => setIsLabelOpen(true)}
        onMouseLeave={() => setIsLabelOpen(false)}
        onClick={() => setIsLabelOpen(true)}
      >
        {children}
      </span>
    </Tooltip>
  );
};
