// pages/dashboard.tsx
"use client";
import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
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
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  FaFire,
  FaHeart,
  FaLevelUpAlt,
  FaMedal,
  FaRegStar,
} from "react-icons/fa";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDayId, getMonthId, getWeekId } from "@/utils/dateUtils";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Automatically registers the necessary chart components
import { badgeConfigs } from "../badgeConfigs";
import { calculateXpToNextLevel } from "@/utils/dashboardUtils";
import { GiLaurelsTrophy } from "react-icons/gi";
import { withAuth } from "@/components/withAuth";
import React from "react";

interface UserData {
  email: string;
  totalCount: number;
  level: number; // New field for user level
  xp: number;
  salawatCounts: { [key: string]: number };
  currentStreak: number;
  highestStreak: number;
  dailySalawatCounts: { [key: string]: any };
  weeklySalawatCounts: { [key: string]: any };
  monthlySalawatCounts: { [key: string]: any };
  lastRecitationDate: null;
  badges: string[]; // New field for badges
}

interface SalawatData {
  title: string;
}

const tourSteps: Step[] = [
  {
    target: "body",
    content: "Are you ready for a quick tour?",
    placement: "center",
  },
  {
    target: ".level-section",
    content: "This is your level and XP progress. Keep reciting to level up!",
    placement: "bottom",
  },
  {
    target: ".streak-section",
    content:
      "Here you can see your current and highest streaks. Keep up the good work!",
    placement: "bottom",
  },
  {
    target: ".progress-section",
    content:
      "Track your Salawat progress here. Each Salawat's count is displayed.",
    placement: "top",
  },
  {
    target: ".badges-section",
    content: "Check out your earned badges and achievements!",
    placement: "top",
  },
  {
    target: ".charts-section",
    content: "Visualize your Salawat counts over time in these charts.",
    placement: "top",
  },
];

function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [salawatNames, setSalawatNames] = useState<{ [key: string]: string }>(
    {}
  );

  const [isTourOpen, setIsTourOpen] = useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const progressCardBgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const highlightColor = useColorModeValue("teal.500", "teal.300");
  const streakBgColor = useColorModeValue("blue.50", "blue.900");
  const streakTextColor = useColorModeValue("blue.800", "blue.200");
  const progressBarColor = useColorModeValue("green.400", "green.600");

  useEffect(() => {
    if (user && !user.emailVerified) {
      router.push("/verify-email");
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

    // Check local storage for tour status
    const hasSeenTour = localStorage.getItem("hasSeenDashboardTour");
    if (!hasSeenTour) {
      setIsTourOpen(true);
    }
  }, [user, router]);

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      // Set local storage flag to true after tour is completed or skipped
      localStorage.setItem("hasSeenDashboardTour", "true");
      setIsTourOpen(false); // Close the tour
    }
  };

  if (!user) {
    return <Box>Please log in to view your dashboard.</Box>;
  }

  const userLevel = userData?.level || 1;
  const userXp = userData?.xp || 0;
  const xpToNextLevel = calculateXpToNextLevel(userLevel);
  const progressPercent = (userXp / xpToNextLevel) * 100;

  const levelSection = (
    <Box
      p={6}
      bg={cardBgColor} // Solid background color
      borderRadius="lg"
      boxShadow="2xl"
      textAlign="center"
      className="level-section"
    >
      <VStack spacing={5} align="center">
        <Flex align="center" justify="center" direction="column">
          <CircularProgress
            value={progressPercent}
            size="120px"
            thickness="12px"
            color={highlightColor}
            trackColor="gray.200"
          >
            <CircularProgressLabel>
              <Icon as={FaLevelUpAlt} boxSize={10} color={highlightColor} />
            </CircularProgressLabel>
          </CircularProgress>
          <Text fontSize="2xl" fontWeight="bold" color={highlightColor} mt={4}>
            Level {userLevel}
          </Text>
        </Flex>
        <HStack spacing={4}>
          <Icon as={GiLaurelsTrophy} boxSize={6} color={highlightColor} />
          <Text fontSize="lg" color={textColor}>
            {userXp} XP / {xpToNextLevel} XP
          </Text>
        </HStack>
        <Progress
          value={progressPercent}
          colorScheme="teal"
          size="lg"
          width="100%"
          borderRadius="lg"
          hasStripe
          isAnimated
        />
        <Text fontSize="md" color={textColor} fontStyle="italic">
          Keep reciting to level up and achieve closeness to the Beloved ﷺ{" "}
          <Icon as={FaHeart} boxSize={5} color="red.500" />
        </Text>
      </VStack>
    </Box>
  );
  const now = new Date();
  const dayId = getDayId(now);
  const weekId = getWeekId(now);
  const monthId = getMonthId(now);

  const streakSection = (
    <>
      <Box
        p={4}
        bg={streakBgColor}
        borderRadius="md"
        textAlign="center"
        borderWidth="1px"
        borderColor="blue.200"
        boxShadow="md"
        className="streak-section"
      >
        <Text fontSize="lg" color={streakTextColor} fontWeight="bold" mb={2}>
          <Icon as={FaFire} boxSize={5} color="red.500" /> Keep your streak
          going!
        </Text>
        <Text fontSize="md" color={streakTextColor}>
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

  const dailyProgressSection = (
    <VStack spacing={6} align="stretch">
      <Heading color={textColor} size="md">
        Today&apos;s Salawat Recitations
      </Heading>

      {/* Display total count first */}
      {userData?.dailySalawatCounts?.[dayId]?.totalCount && (
        <Box
          bg={progressCardBgColor}
          p={4}
          borderRadius="lg"
          textAlign="center"
          mb={4}
        >
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Total Salawat Today:{" "}
            {Number(userData.dailySalawatCounts[dayId].totalCount)}
          </Text>
        </Box>
      )}

      {/* Display individual salawat counts */}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={{ base: 8, md: 6 }}
      >
        {userData?.dailySalawatCounts?.[dayId] &&
          Object.entries(userData.dailySalawatCounts[dayId])
            .filter(([key]) => key !== "totalCount") // Exclude totalCount
            .map(([salawatId, dailyCount]) => (
              <GridItem
                key={salawatId}
                bg={progressCardBgColor}
                p={4}
                borderRadius="lg"
              >
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  {salawatNames[salawatId] || salawatId}
                </Text>
                <Text fontSize="md" color={textColor}>
                  Today&apos;s Count: {Number(dailyCount)}
                </Text>
              </GridItem>
            ))}
      </Grid>
    </VStack>
  );

  const progressSection = (
    <VStack spacing={6} align="stretch" className="progress-section">
      <Heading color={textColor} size="md">
        Your Salawat Progress
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={{ base: 8, md: 6 }}
      >
        {userData?.salawatCounts &&
          Object.entries(userData.salawatCounts).map(([salawatId, count]) => (
            <GridItem
              key={salawatId}
              bg={progressCardBgColor}
              p={4}
              borderRadius="lg"
            >
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

  const badgesSection = (
    <Box
      className="badges-section"
      p={6}
      bg={cardBgColor}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading color={textColor} size="md" mb={4}>
        Your Badges
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {userData?.badges?.map((badgeKey) => {
          const badgeConfig = badgeConfigs[badgeKey];
          console.log(badgeKey, badgeConfig);

          if (badgeConfig) {
            return (
              <Box
                key={badgeKey}
                bg={`${badgeConfig.color}.100`}
                p={4}
                borderRadius="md"
                boxShadow="md"
              >
                <VStack spacing={4} align="center">
                  <Icon
                    as={badgeConfig.icon}
                    boxSize={12}
                    color={badgeConfig.color}
                  />
                  <Text fontSize="lg" fontWeight="bold">
                    {badgeConfig.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {badgeConfig.description}
                  </Text>
                </VStack>
              </Box>
            );
          }
          return null;
        })}
      </SimpleGrid>
    </Box>
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

  // Sort daily, weekly, and monthly data by their keys
  const sortedDailyKeys = Object.keys(
    userData?.dailySalawatCounts || {}
  ).sort(); // Sort by date
  const sortedWeeklyKeys = Object.keys(
    userData?.weeklySalawatCounts || {}
  ).sort(); // Sort by week
  const sortedMonthlyKeys = Object.keys(
    userData?.monthlySalawatCounts || {}
  ).sort(); // Sort by month

  const dailyData = {
    labels: sortedDailyKeys.slice(-7), // Last 7 sorted dates
    datasets: [
      {
        label: "Daily Salawat",
        data: sortedDailyKeys
          .slice(-7) // Only take the last 7 sorted keys
          .map((key) => userData?.dailySalawatCounts[key]?.totalCount || 0), // Map keys to corresponding totalCount
        backgroundColor: "teal",
        borderColor: "teal",
      },
    ],
  };

  const weeklyData = {
    labels: sortedWeeklyKeys.slice(-4), // Last 4 sorted weeks
    datasets: [
      {
        label: "Weekly Salawat",
        data: sortedWeeklyKeys
          .slice(-4) // Only take the last 4 sorted keys
          .map((key) => userData?.weeklySalawatCounts[key]?.totalCount || 0), // Map keys to corresponding totalCount
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  const monthlyData = {
    labels: sortedMonthlyKeys.slice(-12), // Last 12 sorted months
    datasets: [
      {
        label: "Monthly Salawat",
        data: sortedMonthlyKeys
          .slice(-12) // Only take the last 12 sorted keys
          .map((key) => userData?.monthlySalawatCounts[key]?.totalCount || 0), // Map keys to corresponding totalCount
        backgroundColor: "purple",
        borderColor: "purple",
      },
    ],
  };

  return (
    <>
      <Joyride
        steps={tourSteps}
        continuous
        showSkipButton
        showProgress
        run={isTourOpen}
        callback={handleTourCallback}
        styles={{
          beacon: {
            display: "none", // Hide the beacon completely
          },
        }}
      />
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
            {/* Level Section */}
            {levelSection}
            {/* Streak Section */}
            {streakSection}

            {dailyProgressSection}
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

            {badgesSection}
            {/* Charts Section */}
            <Box
              className="charts-section"
              p={10}
              bg={cardBgColor}
              borderRadius="lg"
              boxShadow="2xl"
            >
              <VStack spacing={4} align="stretch">
                <Heading color={textColor} size="md">
                  Your Salawat Over Time
                </Heading>
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing={{ base: 16, md: 6 }}
                >
                  <Box h="250px">
                    <Text fontSize="lg" mb={2} color={textColor}>
                      Daily
                    </Text>
                    <Bar data={dailyData} options={chartOptions} />
                  </Box>
                  <Box h="250px">
                    <Text fontSize="lg" mb={2} color={textColor}>
                      Weekly
                    </Text>
                    <Bar data={weeklyData} options={chartOptions} />
                  </Box>
                  <Box h="250px">
                    <Text fontSize="lg" mb={2} color={textColor}>
                      Monthly
                    </Text>
                    <Bar data={monthlyData} options={chartOptions} />
                  </Box>
                </SimpleGrid>
              </VStack>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}

export default withAuth(Dashboard);
