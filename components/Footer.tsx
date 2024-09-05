import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  const bgColor = "green.50";
  const textColor = "green.800";

  return (
    <Box bg={bgColor} color={textColor} py={4}>
      <Text textAlign="center">
        © {new Date().getFullYear()} Salawat App. All rights reserved.
      </Text>
      <Text textAlign="center">
        by Asswuffah Foundation
      </Text>
    </Box>
  );
}
