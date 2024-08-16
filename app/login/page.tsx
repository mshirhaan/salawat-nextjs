// pages/login.tsx

'use client';
import Login from "@/components/Login";
import { Box, Heading } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" my={8}>
        Log In
      </Heading>
      <Login />
    </Box>
  );
}
