"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Divider,
  Icon,
  useColorModeValue,
  Avatar,
  Stack,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { FaFire, FaMedal, FaRegStar, FaSignOutAlt } from "react-icons/fa";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [salawatNames, setSalawatNames] = useState<{ [key: string]: string }>(
    {}
  );

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const highlightColor = useColorModeValue("teal.500", "teal.300");

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
          names[doc.id] = salawatData.title;
        });
        setSalawatNames(names);
      };

      fetchUserData();
      fetchSalawatNames();
    }
  }, [user, router]);

  if (!user) {
    return <Box>Please log in to view your dashboard.</Box>;
  }

  return (
    <Box bg={bgColor} minH="100vh" py={12} px={6}>
      <Flex direction="column" align="center" maxW="900px" mx="auto">
        <VStack spacing={8} align="stretch" width="100%">
          {/* User Greeting Section */}
          <Flex justify="space-between" align="center" width="100%">
            <HStack spacing={4}>
              <Avatar size="lg" name={user.displayName || "User"} />
              <VStack align="flex-start" spacing={0}>
                <Heading color={textColor} size="lg">
                  Welcome, {user.displayName}
                </Heading>
                <Text color={highlightColor}>
                  Your personal Salawat dashboard
                </Text>
              </VStack>
            </HStack>
          </Flex>

          {/* Streak Section */}
          <Box
            p={4}
            bg="blue.50"
            borderRadius="md"
            textAlign="center"
            borderWidth="1px"
            borderColor="blue.200"
            boxShadow="md"
          >
            <Text fontSize="lg" color="blue.800" fontWeight="bold" mb={2}>
              <Icon as={FaFire} boxSize={5} color="red.500" /> Keep your streak
              going!
            </Text>
            <Text fontSize="md" color="blue.700">
              Your streak is based on daily recitations. Don’t miss a day to
              keep your streak going strong!
            </Text>
          </Box>

          {/* Total Salawat Section */}
          <Box p={6} bg={cardBgColor} borderRadius="lg" boxShadow="2xl">
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between" align="center">
                <Heading color={highlightColor} size="lg" fontWeight="bold">
                  Total Salawat Recited
                </Heading>
                <Icon as={FaMedal} boxSize={10} color={highlightColor} />
              </HStack>

              <Flex direction="column" align="center">
                <Text
                  fontSize="6xl"
                  fontWeight="extrabold"
                  color={highlightColor}
                >
                  {userData?.totalCount || 0}
                </Text>
                <Text fontSize="xl" color={textColor} mt={2}>
                  Salawat and counting...
                </Text>
              </Flex>

              <Divider borderColor="gray.400" />

              <Text fontSize="lg" color={textColor} textAlign="center">
                Every Salawat brings blessings. Keep the Salawat flowing to
                Madinah!
              </Text>
            </VStack>
          </Box>

          {/* Streak Stats Section */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box p={6} bg={cardBgColor} borderRadius="lg" boxShadow="lg">
              <VStack spacing={4} align="center">
                <Icon as={FaFire} boxSize={8} color="red.500" />
                <Text fontSize="3xl" fontWeight="bold" color={highlightColor}>
                  {userData?.currentStreak || 0}
                </Text>
                <Text fontSize="lg" color={textColor}>
                  Current Streak
                </Text>
              </VStack>
            </Box>
            <Box p={6} bg={cardBgColor} borderRadius="lg" boxShadow="lg">
              <VStack spacing={4} align="center">
                <Icon as={FaRegStar} boxSize={8} color="yellow.400" />
                <Text fontSize="3xl" fontWeight="bold" color={highlightColor}>
                  {userData?.highestStreak || 0}
                </Text>
                <Text fontSize="lg" color={textColor}>
                  Highest Streak
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Salawat Progress Section */}
          <Box p={6} bg={cardBgColor} borderRadius="lg" boxShadow="2xl">
            <VStack spacing={6} align="stretch">
              <Heading color={textColor} size="md">
                Your Salawat Progress
              </Heading>
              <Stack spacing={4}>
                {userData?.salawatCounts &&
                  Object.entries(userData.salawatCounts).map(
                    ([salawatId, count]) => (
                      <Flex
                        key={salawatId}
                        justify="space-between"
                        align="center"
                        p={4}
                        bg="gray.100"
                        borderRadius="md"
                        boxShadow="sm"
                      >
                        <Text fontSize="lg" color={textColor}>
                          {salawatNames[salawatId] || salawatId}
                        </Text>
                        <Badge
                          fontSize="lg"
                          colorScheme="teal"
                          borderRadius="md"
                          px={3}
                          py={1}
                        >
                          {count}
                        </Badge>
                      </Flex>
                    )
                  )}
              </Stack>
            </VStack>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}
