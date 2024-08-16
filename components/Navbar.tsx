import { Box, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  const bgColor = "green.50"; // Light mode equivalent
  const textColor = "green.800"; // Light mode text color

  return (
    <Box bg={bgColor} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bold" fontSize="xl" color={textColor}>
          Salawat App
        </Box>
        <Flex alignItems="center">
          <Button as={Link} href="/" variant="ghost" mr={3}>
            Home
          </Button>
          <Button as={Link} href="/salawat" variant="ghost">
            Salawat
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
