// pages/forgot-password.tsx
'use client';
import { useState } from "react";
import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Please check your inbox.");
      toast({
        title: "Check your email",
        description: "A password reset email has been sent to your inbox.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      //router.push("/login");
    } catch (error) {
      let errorMessage =
        "Failed to send password reset email. Please try again.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "The email address is invalid.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email.";
            break;
          default:
            errorMessage = "An error occurred. Please try again.";
        }
      }
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxWidth="400px"
      margin="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <form onSubmit={handleReset}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          isLoading={loading}
          loadingText="Sending email"
        >
          Send Password Reset Email
        </Button>
      </form>
      {message && (
        <Text color="green.500" mt={2} textAlign="center">
          {message}
        </Text>
      )}
      {error && (
        <Text color="red.500" mt={2} textAlign="center">
          {error}
        </Text>
      )}
    </Box>
  );
}
