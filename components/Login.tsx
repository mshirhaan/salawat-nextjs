// components/Login.tsx
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Link,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/dashboard");
    } catch (error) {
      let errorMessage = "Failed to log in. Please check your credentials.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            errorMessage = "The email or password is incorrect.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is invalid.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/missing-email":
            errorMessage = "Please provide an email address.";
            break;
          case "auth/missing-password":
            errorMessage = "Please provide a password.";
            break;
          default:
            errorMessage = "An error occurred. Please try again.";
        }
      }
      setError(errorMessage);
      toast({
        title: "Login failed",
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
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={loading}
            loadingText="Logging in"
          >
            Log In
          </Button>
        </VStack>
      </form>
      {error && (
        <Text color="red.500" mt={2} textAlign="center">
          {error}
        </Text>
      )}

      <Text mt={4} textAlign="center">
        Don&apos;t have an account?{" "}
        <Link color="teal.500" href="/signup">
          Sign up
        </Link>
      </Text>
    </Box>
  );
}
