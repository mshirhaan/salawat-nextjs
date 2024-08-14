import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Salawat Leaderboard
      </Heading>
      <Text>Top reciters of the day, month, and year.</Text>
      {/* Add leaderboard logic here */}
    </Box>
  );
}
