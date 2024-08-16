// components/SignUp.tsx
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
import { createUserDocument } from "@/lib/user";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await createUserDocument(userCredential.user.uid, email, name);

      toast({
        title: "Sign up successful",
        description: "Welcome to Salawat App!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/dashboard");
    } catch (error) {
      setError("Failed to sign up. Please check your details and try again.");
      toast({
        title: "Sign up failed",
        description: "Please try again or use a different email.",
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
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isRequired
          />
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
            loadingText="Signing up"
          >
            Sign Up
          </Button>
        </VStack>
      </form>
      {error && (
        <Text color="red.500" mt={2} textAlign="center">
          {error}
        </Text>
      )}
      <Text mt={4} textAlign="center">
        Already have an account?{" "}
        <Link color="teal.500" href="/login">
          Log in
        </Link>
      </Text>
    </Box>
  );
}
