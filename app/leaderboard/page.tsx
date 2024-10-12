// app/leaderboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  useToast,
  Text,
  Flex,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  VStack,
  Avatar,
  useBreakpointValue,
  Grid,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaTrophy } from "react-icons/fa";
import { getDayId, getMonthId, getWeekId } from "@/utils/dateUtils";
import {
  GiGemPendant,
  GiCutDiamond,
  GiDiamondHard,
  GiFireGem,
  GiCrystalGrowth,
  GiCrystalCluster,
  GiCrystalize,
  GiIceCube,
  GiRoundStar,
  GiSparkles,
  GiStarSwirl,
} from "react-icons/gi";

interface UserData {
  id: string;
  name: string;
  level: number;
  totalCount: number;
}

// Hadith Component
const HadithDisplay = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      mb={8}
      position="relative"
      borderLeft="4px solid"
      borderColor={borderColor}
    >
      <VStack spacing={4} align="start">
        <Text
          fontSize="xl"
          fontWeight="medium"
          fontStyle="italic"
          color={useColorModeValue("gray.700", "gray.200")}
        >
          The person closest to me on the Day of Judgement is the one who sent
          the most Salat upon me.
        </Text>
        <Text
          fontSize="md"
          color={useColorModeValue("gray.600", "gray.400")}
          fontWeight="bold"
        >
          — Prophet Muhammad ﷺ
        </Text>
      </VStack>
    </Box>
  );
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState<
    "daily" | "weekly" | "monthly" | "allTime"
  >("daily"); // Set default to "daily"
  const toast = useToast();

  // Updated color scheme
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const headingColor = useColorModeValue("#5d4037", "#d7ccc8");
  const gradientBg = useColorModeValue(
    "linear-gradient(to right, #f2e6d9, #e6ccb3)",
    "linear-gradient(to right, #3e2723, #4e342e)"
  );
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    async function fetchData() {
      try {
        const usersCollection = collection(db, "users");
        let q;

        const now = new Date();
        const dayId = getDayId(now);
        const weekId = getWeekId(now);
        const monthId = getMonthId(now);

        switch (timeFrame) {
          case "daily":
            q = query(
              usersCollection,
              orderBy(`dailySalawatCounts.${dayId}.totalCount`, "desc"),
              limit(500)
            );
            break;
          case "weekly":
            q = query(
              usersCollection,
              orderBy(`weeklySalawatCounts.${weekId}.totalCount`, "desc"),
              limit(500)
            );
            break;
          case "monthly":
            q = query(
              usersCollection,
              orderBy(`monthlySalawatCounts.${monthId}.totalCount`, "desc"),
              limit(500)
            );
            break;
          default:
            q = query(
              usersCollection,
              orderBy("totalCount", "desc"),
              limit(500)
            );
        }

        const querySnapshot = await getDocs(q);

        const usersList: UserData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          let count;
          switch (timeFrame) {
            case "daily":
              count = data.dailySalawatCounts?.[dayId]?.totalCount || 0;
              break;
            case "weekly":
              count = data.weeklySalawatCounts?.[weekId]?.totalCount || 0;
              break;
            case "monthly":
              count = data.monthlySalawatCounts?.[monthId]?.totalCount || 0;
              break;
            default:
              count = data.totalCount || 0;
          }
          usersList.push({
            id: doc.id,
            name: data.name || "Unknown",
            totalCount: count,
            level: data.level || 0,
          });
        });

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch leaderboard data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [timeFrame, toast]);

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  return (
    <Box bg={bgColor} minHeight="100vh" py={10}>
      <Container maxW="4xl">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" color="teal.600" textAlign="center">
            Salawat Leaderboard
          </Heading>

          <HadithDisplay />
          <Tabs
            isFitted
            variant="enclosed"
            colorScheme="teal"
            width="100%"
            defaultIndex={0} // Set default tab to "daily"
          >
            <TabList mb="1em">
              <Tab onClick={() => setTimeFrame("daily")}>Daily</Tab>
              <Tab onClick={() => setTimeFrame("weekly")}>Weekly</Tab>
              <Tab onClick={() => setTimeFrame("monthly")}>Monthly</Tab>
              <Tab onClick={() => setTimeFrame("allTime")}>All Time</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LeaderboardTable users={users} timeFrame="Daily" />
              </TabPanel>
              <TabPanel>
                <LeaderboardTable users={users} timeFrame="Weekly" />
              </TabPanel>
              <TabPanel>
                <LeaderboardTable users={users} timeFrame="Monthly" />
              </TabPanel>
              <TabPanel>
                <LeaderboardTable users={users} timeFrame="All Time" />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
}

const getRankIcon = (index: number) => {
  if (index === 0) return <FaTrophy color="gold" />;
  if (index === 1) return <FaTrophy color="silver" />;
  if (index === 2) return <FaTrophy color="#CD7F32" />;
  return null;
};

const getAvatarColor = (index: number) => {
  const colors = [
    "yellow.400",
    "gray.400",
    "orange.400",
    "teal.400",
    "purple.400",
    "pink.400",
  ];
  return colors[index] || "teal.400";
};

function LeaderboardTable({
  users,
  timeFrame,
}: {
  users: UserData[];
  timeFrame: string;
}) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");

  const levelToGemMap = [
    { maxLevel: 18, gem: GiGemPendant },
    { maxLevel: 36, gem: GiCutDiamond },
    { maxLevel: 54, gem: GiDiamondHard },
    { maxLevel: 72, gem: GiFireGem },
    { maxLevel: 90, gem: GiCrystalGrowth },
    { maxLevel: 108, gem: GiCrystalCluster },
    { maxLevel: 126, gem: GiCrystalize },
    { maxLevel: 144, gem: GiIceCube },
    { maxLevel: 162, gem: GiRoundStar },
    { maxLevel: 180, gem: GiSparkles },
    { maxLevel: Infinity, gem: GiStarSwirl }, // For levels above 180
  ];

  const levelToColorMap = [
    { maxLevel: 18, color: "blue.400" },
    { maxLevel: 36, color: "green.400" },
    { maxLevel: 54, color: "yellow.400" },
    { maxLevel: 72, color: "orange.400" },
    { maxLevel: 90, color: "red.400" },
    { maxLevel: 108, color: "pink.400" },
    { maxLevel: 126, color: "purple.400" },
    { maxLevel: 144, color: "cyan.400" },
    { maxLevel: 162, color: "teal.400" },
    { maxLevel: 180, color: "lime.400" },
    { maxLevel: Infinity, color: "violet.400" }, // For levels above 180
  ];

  const getGemForLevel = (level: number) => {
    return levelToGemMap.find((entry) => level <= entry.maxLevel)?.gem;
  };

  const getColorForLevel = (level: number) => {
    return levelToColorMap.find((entry) => level <= entry.maxLevel)?.color;
  };

  const getLevelTitle = (level: number) => {
    if (level < 20) return "Bronze League";
    if (level < 40) return "Silver League";
    if (level < 60) return "Gold League";
    if (level < 80) return "Platinum League";
    if (level < 100) return "Diamond League";
    if (level < 140) return "Master League";
    if (level < 180) return "Grandmaster League";
    return "Legend League";
  };

  return (
    <Box bg={bgColor} borderRadius="lg" boxShadow="md" overflow="hidden">
      {isMobile ? (
        <Grid templateColumns="repeat(1, 1fr)" gap={4} p={4}>
          {users.map((user, index) => {
            const gemIcon = getGemForLevel(user.level);
            const gemColor = getColorForLevel(user.level);
            const leagueTitle = getLevelTitle(user.level);

            return (
              <Box
                key={user.id}
                p={4}
                borderWidth={1}
                borderRadius="md"
                boxShadow="sm"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <VStack align="flex-start">
                    <Text fontSize="xs" color="gray.500" mb={1}>
                      Rank
                    </Text>
                    <Flex align="center">
                      <Text fontWeight="bold" mr={2}>
                        {index + 1}
                      </Text>
                      {getRankIcon(index)}
                    </Flex>
                    <Text fontSize="sm" color={gemColor}>
                      {leagueTitle}
                    </Text>
                  </VStack>
                  <Flex direction="column" align="flex-end">
                    <Text fontSize="xs" color="gray.500" mb={1}>
                      Salawat Count
                    </Text>
                    <Badge
                      colorScheme="teal"
                      fontSize="0.8em"
                      borderRadius="full"
                      px={2}
                    >
                      {user.totalCount.toLocaleString()}
                    </Badge>
                  </Flex>
                </Flex>
                <Flex align="center" mt={2}>
                  <Avatar
                    name={user.name}
                    bg={getAvatarColor(index)}
                    size="sm"
                    mr={2}
                  />
                  <Text fontWeight="medium">{user.name}</Text>
                </Flex>
                <Flex mt={2} align="center">
                  <Icon as={gemIcon} boxSize={6} color={gemColor} mr={2} />
                  <Text fontWeight="bold" color={gemColor}>
                    Level {user.level}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Grid>
      ) : (
        <Table variant="simple">
          <TableCaption>Top reciters by {timeFrame} Salawat count</TableCaption>
          <Thead bg="teal.500">
            <Tr>
              <Th color="white">Rank</Th>
              <Th color="white">Name</Th>
              <Th color="white">League</Th>
              <Th color="white">Level</Th>
              <Th color="white" isNumeric>
                Salawat Count
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => {
              const gemIcon = getGemForLevel(user.level);
              const gemColor = getColorForLevel(user.level);
              const leagueTitle = getLevelTitle(user.level);

              return (
                <Tr
                  key={user.id}
                  _hover={{ bg: hoverBgColor }}
                  transition="background-color 0.2s"
                >
                  <Td>
                    <Flex align="center">
                      <Text fontWeight="bold" mr={2}>
                        {index + 1}
                      </Text>
                      {getRankIcon(index)}
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Avatar
                        name={user.name}
                        bg={getAvatarColor(index)}
                        size="sm"
                        mr={2}
                      />
                      <Text fontWeight="medium">{user.name}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontWeight="medium" color={gemColor}>
                      {leagueTitle}
                    </Text>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Icon as={gemIcon} boxSize={6} color={gemColor} mr={2} />
                      <Text fontWeight="bold" color={gemColor}>
                        Level {user.level}
                      </Text>
                    </Flex>
                  </Td>
                  <Td isNumeric>
                    <Badge
                      colorScheme="teal"
                      fontSize="0.8em"
                      borderRadius="full"
                      px={2}
                    >
                      {user.totalCount.toLocaleString()}
                    </Badge>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
