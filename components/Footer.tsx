"use client";

import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  const bgColor = useColorModeValue("green.50", "gray.800");
  const textColor = useColorModeValue("green.800", "green.200");

  return (
    <Box bg={bgColor} color={textColor} py={4}>
      <Text textAlign="center">
        © {new Date().getFullYear()} Salawat App. All rights reserved.
      </Text>
      <Text textAlign="center">by Asswuffah Foundation</Text>
    </Box>
  );
}
