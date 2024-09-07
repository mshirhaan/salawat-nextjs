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

interface UserData {
  id: string;
  name: string;
  totalCount: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState<
    "daily" | "weekly" | "monthly" | "allTime"
  >("daily"); // Set default to "daily"
  const toast = useToast();

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
              limit(100)
            );
            break;
          case "weekly":
            q = query(
              usersCollection,
              orderBy(`weeklySalawatCounts.${weekId}.totalCount`, "desc"),
              limit(100)
            );
            break;
          case "monthly":
            q = query(
              usersCollection,
              orderBy(`monthlySalawatCounts.${monthId}.totalCount`, "desc"),
              limit(100)
            );
            break;
          default:
            q = query(
              usersCollection,
              orderBy("totalCount", "desc"),
              limit(100)
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
    <Box bg="gray.50" minHeight="100vh" py={10}>
      <Container maxW="4xl">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" color="teal.600" textAlign="center">
            Salawat Leaderboard
          </Heading>
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

  return (
    <Box bg="white" borderRadius="lg" boxShadow="md" overflow="hidden">
      {isMobile ? (
        <Grid templateColumns="repeat(1, 1fr)" gap={4} p={4}>
          {users.map((user, index) => (
            <Box
              key={user.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="sm"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Flex direction="column" align="flex-start">
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Rank
                  </Text>
                  <Flex align="center">
                    <Text fontWeight="bold" mr={2}>
                      {index + 1}
                    </Text>
                    {getRankIcon(index)}
                  </Flex>
                </Flex>
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
            </Box>
          ))}
        </Grid>
      ) : (
        <Table variant="simple">
          <TableCaption>Top reciters by {timeFrame} Salawat count</TableCaption>
          <Thead bg="teal.500">
            <Tr>
              <Th color="white">Rank</Th>
              <Th color="white">Name</Th>
              <Th color="white" isNumeric>
                Salawat Count
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={user.id} _hover={{ bg: "gray.50" }}>
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
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
