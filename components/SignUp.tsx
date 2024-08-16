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
import { FirebaseError } from "firebase/app";

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
      let errorMessage =
        "Failed to sign up. Please check your details and try again.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "This email is already in use.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is invalid.";
            break;
          case "auth/weak-password":
            errorMessage =
              "The password is too weak. It should be at least 6 characters.";
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
        title: "Sign up failed",
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
