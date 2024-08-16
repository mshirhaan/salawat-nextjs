"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Box, Heading, Text, VStack, HStack, Button, Flex, Divider, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  totalCount: number;
  salawatCounts: {
    [key: string]: number;
  };
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
          <VStack spacing={4} align="stretch">
            <Flex justify="space-between" align="center">
              <Heading size="md" color={textColor}>
                Total Salawat Count
              </Heading>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {userData?.totalCount || 0}
              </Text>
            </Flex>
            <Divider />
            <Stack spacing={4}>
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
