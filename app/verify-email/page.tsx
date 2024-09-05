'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Box, VStack, Text, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";
import { updateEmailVerificationStatus, isEmailVerified } from "@/lib/user";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const checkVerification = async () => {
      if (user && (await isEmailVerified(user.uid))) {
        router.push("/dashboard");
      }
    };

    const interval = setInterval(checkVerification, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [user, router]);

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      if (user) {
        await sendEmailVerification(user);
        toast({
          title: "Verification email sent",
          description: "Please check your inbox",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationComplete = async () => {
    if (user) {
      await user.reload();
      if (user.emailVerified) {
        await updateEmailVerificationStatus(user.uid, true);
        router.push("/dashboard");
      } else {
        toast({
          title: "Not verified",
          description:
            "Your email is not yet verified. Please check your inbox.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
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
      <VStack spacing={4}>
        <Text>
          Please verify your email address. Check your inbox for a verification
          link.
        </Text>
        <Button onClick={handleResendVerification} isLoading={loading}>
          Resend Verification Email
        </Button>
        <Button onClick={handleVerificationComplete}>
          I&apos;ve Verified My Email
        </Button>
      </VStack>
    </Box>
  );
}
