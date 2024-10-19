"use client";

import React from "react";
import {
  Box,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  const bgColor = useColorModeValue("green.50", "gray.800");
  const textColor = useColorModeValue("green.800", "green.200");
  const dividerColor = useColorModeValue("green.200", "gray.600");

  return (
    <Box bg={bgColor} color={textColor} py={6}>
      <VStack spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          © {new Date().getFullYear()} Salawat App. All rights reserved.
        </Text>
        <Text>by Asswuffah Foundation</Text>

        <Divider borderColor={dividerColor} width="80%" />

        <Text fontSize="md" mt={2}>
          Launched on 1st Rabiul Awwal 1446 / 4th September 2024
        </Text>
      </VStack>
    </Box>
  );
}
