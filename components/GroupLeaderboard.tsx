import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  VStack,
  Divider,
  Spinner,
} from "@chakra-ui/react";

type LeaderboardEntry = {
  userId: string;
  salawatCount: number;
  userName: string;
};

export const GroupLeaderboard: React.FC<{ userId: string }> = ({ userId }) => {
  const [leaderboards, setLeaderboards] = useState<{ [groupId: string]: LeaderboardEntry[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboards() {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      const userGroups = userDoc.data()?.groups || [];

      const fetchedLeaderboards: { [groupId: string]: LeaderboardEntry[] } = {};

      for (const groupId of userGroups) {
        const groupRef = doc(db, "groups", groupId);
        const groupDoc = await getDoc(groupRef);
        const groupData = groupDoc.data();

        if (groupData) {
          const leaderboardEntries: LeaderboardEntry[] = await Promise.all(
            Object.entries(groupData.leaderboard || {}).map(async ([userId, salawatCount]) => {
              const userDoc = await getDoc(doc(db, "users", userId));
              const userName = userDoc.data()?.name || "Unknown User"; // Get user's name or default to "Unknown User"
              
              return {
                userId,
                userName,
                salawatCount: salawatCount as number,
              };
            })
          );

          leaderboardEntries.sort((a, b) => b.salawatCount - a.salawatCount); // Sort by salawat count
          fetchedLeaderboards[groupId] = leaderboardEntries;
        }
      }

      setLeaderboards(fetchedLeaderboards);
      setLoading(false);
    }

    fetchLeaderboards();
  }, [userId]);

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="lg" />
        <Text mt={2}>Loading Leaderboards...</Text>
      </Box>
    );
  }

  return (
    <VStack align="start" spacing={6}>
      <Heading as="h2" size="lg">
        Your Group Leaderboards
      </Heading>
      {Object.entries(leaderboards).map(([groupId, leaderboard]) => (
        <Box key={groupId} w="100%" p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
          <Heading as="h3" size="md" mb={4}>
            Group: {groupId}
          </Heading>
          <Divider mb={4} />
          {leaderboard.length > 0 ? (
            <UnorderedList spacing={3} pl={4}>
              {leaderboard.map((entry) => (
                <ListItem key={entry.userId} fontSize="lg">
                  <Text as="span" fontWeight="bold">
                    {entry.userName}
                  </Text>
                  :{" "}
                  <Text as="span" color="green.600">
                    {entry.salawatCount} Salawat
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
          ) : (
            <Text>No entries found for this group.</Text>
          )}
        </Box>
      ))}
    </VStack>
  );
};
