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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
      const userCredential = await login(email, password);
      const user = userCredential.user;

      // Check if Firestore document exists
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Recreate Firestore document if missing
        await setDoc(userDocRef, {
          email: user.email,
          name: user.email,
          emailVerified: false,
          totalCount: 0,
          salawatCounts: {},
          recitationLogs: [], // Field for recitation logs
          currentStreak: 0, // Field for current streak
          highestStreak: 0, // Field for highest streak
          dailySalawatCounts: {}, // New field for daily Salawat counts
          weeklySalawatCounts: {}, // New field for weekly Salawat counts
          monthlySalawatCounts: {}, // New field for monthly Salawat counts
          lastRecitationDate: null, // New field to track the last recitation date
          badges: [],
          level: 1, // Starting level
          xp: 0, // Starting XP
          myGarden: {
            gridSize: 3, // Initial 3x3 grid size
            plants: [], // List of plants placed in the garden
          },
          myPlants: [
            { plantId: "rose", name: "Rose", quantity: 1 },
            { plantId: "tulip", name: "Tulip", quantity: 1 },
          ],
        });
      }

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
      <Text mt={4} textAlign="center">
        <Link color="teal.500" href="/forgot-password">
          Forgot Password?
        </Link>
      </Text>
    </Box>
  );
}
