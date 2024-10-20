"use client";

import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  const bgColor = useColorModeValue("green.50", "gray.800");
  const textColor = useColorModeValue("green.800", "green.200");

  return (
    <Box
      bg={bgColor}
      color={textColor}
      py={4}
      zIndex={1000}
      position={"relative"}
    >
      <Text textAlign="center">
        © {new Date().getFullYear()} Salawat App. All rights reserved.
      </Text>
      <Text textAlign="center">by Asswuffah Foundation</Text>

      {/* Date Display with Better Wording */}
      <Text textAlign="center" mt={2} fontSize="lg" color={textColor}>
        Launched on 1st Rabiul Awwal 1446 / 4th September 2024
      </Text>
    </Box>
  );
}
