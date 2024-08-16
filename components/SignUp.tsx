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
} from "@chakra-ui/react";
import { createUserDocument } from "@/lib/user";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setError("Failed to sign up");
      toast({
        title: "Sign up failed",
        description: "Please try again or use a different email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" colorScheme="teal">
            Sign Up
          </Button>
        </VStack>
      </form>
      {error && (
        <Text color="red.500" mt={2}>
          {error}
        </Text>
      )}
      <Text mt={4}>
        Already have an account?{" "}
        <Link color="teal.500" href="/login">
          Log in
        </Link>
      </Text>
    </Box>
  );
}
