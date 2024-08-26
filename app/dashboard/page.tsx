"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Avatar,
  Stack,
  SimpleGrid,
  Badge,
  Icon,
  useColorModeValue,
  Divider,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { FaFire, FaMedal, FaRegStar } from "react-icons/fa";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDayId, getMonthId, getWeekId } from "@/utils/dateUtils";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Automatically registers the necessary chart components

interface UserData {
  email: string;
  totalCount: number;
  salawatCounts: { [key: string]: number };
  currentStreak: number;
  highestStreak: number;
  dailySalawatCounts: { [key: string]: any };
  weeklySalawatCounts: { [key: string]: any };
  monthlySalawatCounts: { [key: string]: any };
  lastRecitationDate: null;
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

  const now = new Date();
  const dayId = getDayId(now);
  const weekId = getWeekId(now);
  const monthId = getMonthId(now);

  const streakSection = (
    <>
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
          Your streak is based on daily recitations. Don’t miss a day to keep
          your streak going strong!
        </Text>
      </Box>
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
    </>
  );

  const progressSection = (
    <VStack spacing={6} align="stretch">
      <Heading color={textColor} size="md">
        Your Salawat Progress
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {userData?.salawatCounts &&
          Object.entries(userData.salawatCounts).map(([salawatId, count]) => (
            <GridItem key={salawatId} bg="gray.100" p={4} borderRadius="lg">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                {salawatNames[salawatId] || salawatId}
              </Text>
              <Progress value={(count / userData.totalCount) * 100} size="lg" />
              <Badge
                fontSize="lg"
                colorScheme="teal"
                borderRadius="md"
                px={3}
                py={1}
                mt={2}
              >
                {count}
              </Badge>
            </GridItem>
          ))}
      </Grid>
    </VStack>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dailyData = {
    labels: Object.keys(userData?.dailySalawatCounts || {}).slice(-7),
    datasets: [
      {
        label: "Daily Salawat",
        data: Object.values(userData?.dailySalawatCounts || {}).map(
          (data: any) => data.totalCount
        ),
        fill: false,
        backgroundColor: "teal",
        borderColor: "teal",
        tension: 0.1,
      },
    ],
  };

  const weeklyData = {
    labels: Object.keys(userData?.weeklySalawatCounts || {}).slice(-4),
    datasets: [
      {
        label: "Weekly Salawat",
        data: Object.values(userData?.weeklySalawatCounts || {}).map(
          (data: any) => data.totalCount
        ),
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  const monthlyData = {
    labels: Object.keys(userData?.monthlySalawatCounts || {}).slice(-12),
    datasets: [
      {
        label: "Monthly Salawat",
        data: Object.values(userData?.monthlySalawatCounts || {}).map(
          (data: any) => data.totalCount
        ),
        fill: false,
        backgroundColor: "purple",
        borderColor: "purple",
        tension: 0.1,
      },
    ],
  };

  return (
    <Box bg={bgColor} minH="100vh" py={12} px={6}>
      <Flex direction="column" align="center" maxW="1200px" mx="auto">
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
          {streakSection}

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

              <Divider my={4} />

              {/* Salawat Progress Section */}
              {progressSection}
            </VStack>
          </Box>

          {/* Charts Section */}
          <Box p={10} bg={cardBgColor} borderRadius="lg" boxShadow="2xl">
            <VStack spacing={4} align="stretch">
              <Heading color={textColor} size="md">
                Your Salawat Over Time
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <Box h="250px">
                  <Text fontSize="lg" mb={2} color={textColor}>
                    Daily
                  </Text>
                  <Line data={dailyData} options={chartOptions} />
                </Box>
                <Box h="250px">
                  <Text fontSize="lg" mb={2} color={textColor}>
                    Weekly
                  </Text>
                  <Line data={weeklyData} options={chartOptions} />
                </Box>
                <Box h="250px">
                  <Text fontSize="lg" mb={2} color={textColor}>
                    Monthly
                  </Text>
                  <Line data={monthlyData} options={chartOptions} />
                </Box>
              </SimpleGrid>
            </VStack>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}
