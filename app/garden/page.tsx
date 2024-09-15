// pages/myGarden.tsx
"use client";
import GardenGrid from "@/components/GardenGrid"; // Adjust this path as needed
import { withAuth } from "@/components/withAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Heading } from "@chakra-ui/react";

const MyGarden = () => {
  const { user } = useAuth();

  return (
    <Box p={4}>
      <Heading as="h1" size="2xl" textAlign="center" color="teal.500">
        Salawat Garden
      </Heading>
      {user && user?.uid && <GardenGrid userId={user.uid} />}
    </Box>
  );
};

export default withAuth(MyGarden);
