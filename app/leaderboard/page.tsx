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
  IconButton,
  Text,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaSortAmountDownAlt } from "react-icons/fa";

interface UserData {
  name: string;
  totalCount: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, orderBy("totalCount", "desc"));
        const querySnapshot = await getDocs(q);

        const usersList: UserData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          usersList.push({
            name: data.name || "Unknown",
            totalCount: data.totalCount || 0,
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
  }, [toast]);

  if (loading) {
    return (
      <Box p={5} textAlign="center">
        <Spinner size="xl" color="teal.500" />
        <Text mt={4} color="teal.500" fontSize="lg">
          Loading leaderboard...
        </Text>
      </Box>
    );
  }

  return (
    <Box p={5} bg="gray.50" minHeight="100vh">
      <Flex direction="column" align="center" mb={6}>
        <Heading as="h1" size="2xl" color="teal.400" mb={4}>
          Leaderboard
        </Heading>
      </Flex>
      <Box bg="white" borderRadius="md" shadow="md">
        <Table variant="simple" colorScheme="teal">
          <TableCaption>Top users by total Salawat count</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>
                Total Count
                <IconButton
                  aria-label="Sort by total count"
                  icon={<FaSortAmountDownAlt />}
                  variant="link"
                  color="teal.500"
                  ml={2}
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => {
              let backgroundColor = "white"; // Default color for all rows
              let badgeColor;
              let badgeText;
              let badgeStyle = {};

              if (index === 0) {
                backgroundColor = "yellow.50"; // Light Gold
                badgeColor = "yellow.400";
                badgeText = "🥇 Gold";
                badgeStyle = {
                  border: "2px solid gold",
                  boxShadow: "0 0 5px rgba(255, 215, 0, 0.5)",
                };
              } else if (index === 1) {
                backgroundColor = "gray.50"; // Light Silver
                badgeColor = "gray.400";
                badgeText = "🥈 Silver";
                badgeStyle = {
                  border: "2px solid silver",
                  boxShadow: "0 0 5px rgba(192, 192, 192, 0.5)",
                };
              } else if (index === 2) {
                backgroundColor = "orange.50"; // Light Bronze
                badgeColor = "orange.400";
                badgeText = "🥉 Bronze";
                badgeStyle = {
                  border: "2px solid bronze",
                  boxShadow: "0 0 5px rgba(205, 127, 50, 0.5)",
                };
              }

              return (
                <Tr key={index} bg={backgroundColor}>
                  <Td>
                    {user.name}
                    {index < 3 && (
                      <Badge
                        colorScheme={badgeColor}
                        ml={2}
                        fontSize="0.9em"
                        p={2}
                        borderRadius="md"
                        style={badgeStyle}
                      >
                        {badgeText}
                      </Badge>
                    )}
                  </Td>
                  <Td isNumeric>{user.totalCount}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
