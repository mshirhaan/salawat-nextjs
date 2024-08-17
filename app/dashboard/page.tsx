"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Box, Heading, Text, VStack, HStack, Button, Flex, Divider, useColorModeValue, Stack, Icon } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { FaFire } from "react-icons/fa";

interface UserData {
  email: string;
  totalCount: number;
  salawatCounts: {
    [key: string]: number;
  };
  currentStreak: number;
  highestStreak: number;
}

interface SalawatData {
  title: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [salawatNames, setSalawatNames] = useState<{ [key: string]: string }>({});

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      const fetchUserData = async () => {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData(data);
          }
        }
      };

      const fetchSalawatNames = async () => {
        const salawatCollection = collection(db, "salawat");
        const salawatSnapshot = await getDocs(salawatCollection);
        const names: { [key: string]: string } = {};
        salawatSnapshot.forEach((doc) => {
          const salawatData = doc.data() as SalawatData;
          names[doc.id] = salawatData.title; // Store the Salawat ID and its title
        });
        setSalawatNames(names);
      };

      fetchUserData();
      fetchSalawatNames();
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!user) {
    return <Box>Please log in to view your dashboard.</Box>;
  }

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <Flex direction="column" align="center" maxW="1200px" mx="auto">
        <Heading mb={6} color={textColor}>
          Your Salawat Dashboard
        </Heading>
        <Box
          p={6}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          width="100%"
        >
          <VStack spacing={6} align="stretch">
            {/* Streaks Message */}
            <Box
              p={4}
              bg="blue.50"
              borderRadius="md"
              mb={6}
              textAlign="center"
              borderWidth="1px"
              borderColor="blue.200"
            >
              <Text fontSize="lg" color="blue.800" fontWeight="bold" mb={2}>
                <Icon as={FaFire} boxSize={5} color="red.500" /> Keep your streak going!
              </Text>
              <Text fontSize="md" color="blue.700">
                Your streaks are based on daily recitations. Don’t miss a day to keep your streak going strong!
              </Text>
            </Box>
            
            {/* Streaks Section */}
            <Flex direction="column" align="center" mb={6}>
              <Heading size="lg" color={textColor} mb={4}>
                <Icon as={FaFire} boxSize={6} color="red.500" /> Streaks
              </Heading>
              <HStack spacing={8} mt={4}>
                <VStack spacing={2} align="center">
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                    Current Streak
                  </Text>
                  <Box p={4} borderWidth="1px" borderRadius="md" bg="yellow.100">
                    <Text fontSize="3xl" fontWeight="bold" color="orange.600">
                      {userData?.currentStreak || 0}
                    </Text>
                  </Box>
                </VStack>
                <VStack spacing={2} align="center">
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                    Highest Streak
                  </Text>
                  <Box p={4} borderWidth="1px" borderRadius="md" bg="yellow.200">
                    <Text fontSize="3xl" fontWeight="bold" color="orange.600">
                      {userData?.highestStreak || 0}
                    </Text>
                  </Box>
                </VStack>
              </HStack>
            </Flex>
            <Divider />
            <Stack spacing={4}>
              <Heading size="md" color={textColor}>
                Total Salawat Count
              </Heading>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {userData?.totalCount || 0}
              </Text>
              <Heading size="md" color={textColor}>
                Individual Salawat Counts
              </Heading>
              {userData?.salawatCounts &&
                Object.entries(userData.salawatCounts).map(([salawatId, count]) => (
                  <HStack
                    key={salawatId}
                    justify="space-between"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="gray.100"
                  >
                    <Text fontSize="lg" color={textColor}>
                      {salawatNames[salawatId] || salawatId}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {count}
                    </Text>
                  </HStack>
                ))}
            </Stack>
          </VStack>
        </Box>
        <Button mt={8} onClick={handleLogout} colorScheme="red" size="lg">
          Logout
        </Button>
      </Flex>
    </Box>
  );
}
