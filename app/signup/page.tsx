// pages/signup.tsx
"use client";

import SignUp from "@/components/SignUp";
import { Box, Heading } from "@chakra-ui/react";

export default function SignUpPage() {
  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" my={8}>
        Sign Up
      </Heading>
      <SignUp />
    </Box>
  );
}
