"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Spinner,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGlobe } from "react-icons/fa"; // Icon for global representation
import { collection, getDocs } from "firebase/firestore"; // Firestore import
import { db } from "@/lib/firebase";
import CountUp from "react-countup"; // For animated counting

const GlobalSalawatCount: React.FC = () => {
  const [totalSalawat, setTotalSalawat] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the total Salawat count globally
  useEffect(() => {
    const fetchTotalSalawat = async () => {
      setLoading(true);
      try {
        const usersCollection = collection(db, "users");
        const userDocs = await getDocs(usersCollection);

        let totalCount = 0;
        userDocs.forEach((doc) => {
          const userData = doc.data();
          if (userData.totalCount) {
            totalCount += userData.totalCount;
          }
        });

        setTotalSalawat(totalCount);
      } catch (error) {
        console.error("Error fetching total Salawat count: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSalawat();
  }, []);

  // Styling and color modes
  const bgGradient = useColorModeValue(
    "linear(to-br, teal.300, blue.400, purple.500)",
    "linear(to-br, teal.500, blue.600, purple.700)"
  );
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Box
      bgGradient={bgGradient}
      p={10}
      borderRadius="xl"
      boxShadow="dark-lg"
      textAlign="center"
      my={10}
      maxW="xl"
      mx="auto"
      position="relative"
      overflow="hidden"
    >
      {/* Globe Icon */}
      <Icon as={FaGlobe} boxSize={14} color="whiteAlpha.800" mb={6} />

      {/* Title with refined shadow */}
      <Heading
        size="lg"
        color="white"
        textShadow="0 2px 6px rgba(0, 0, 0, 0.4)"
        mb={6}
      >
        Global Salawat Count
      </Heading>

      {/* Loading Spinner */}
      {loading ? (
        <Spinner size="xl" color="green.300" thickness="4px" speed="0.75s" />
      ) : (
        <Text
          fontSize="5xl"
          fontWeight="extrabold"
          color="green.300"
          mt={6}
          textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
          letterSpacing="widest"
        >
          {/* Animated Counter */}
          {totalSalawat ? (
            <CountUp end={totalSalawat} separator="," duration={2} />
          ) : (
            "N/A"
          )}{" "}
          <br />
          <Box as="span" color="whiteAlpha.800" fontSize="2xl">
            Salawat Recited Globally
          </Box>
        </Text>
      )}

      {/* Beautiful Date Display */}
      <Text
        fontSize="lg"
        color="whiteAlpha.800"
        mt={4}
        textShadow="0 1px 3px rgba(0, 0, 0, 0.3)"
      >
        Established on 1st Rabiul Awwal 1446 / 4th September 2024
      </Text>
    </Box>
  );
};

export default GlobalSalawatCount;
