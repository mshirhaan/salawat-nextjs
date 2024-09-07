'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/components/Login";
import { Box, Heading } from "@chakra-ui/react";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     // If the user is already logged in, redirect to the previous route or home page
  //     router.back(); // This will take the user back to the previous route
  //   }
  // }, [user, router]);

  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" my={8}>
        Log In
      </Heading>
      <Login />
    </Box>
  );
}
