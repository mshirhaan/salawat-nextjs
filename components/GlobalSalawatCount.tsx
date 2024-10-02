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
import { motion } from "framer-motion"; // For animation
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
      as={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition="all 0.6s ease-in-out"
      _hover={{ transform: "scale(1.02)", transition: "all 0.3s ease-in-out" }}
      overflow="hidden"
    >
      {/* Subtle moving background animation */}
      <Box
        position="absolute"
        top={-40}
        right={-40}
        bg="rgba(255, 255, 255, 0.1)"
        boxSize="300px"
        borderRadius="full"
        filter="blur(100px)"
        as={motion.div}
        animate={{ rotate: 360 }}
      />

      {/* Globe Icon */}
      <Icon
        as={FaGlobe}
        boxSize={14}
        color="whiteAlpha.800"
        mb={6}
        _hover={{ color: "white", transform: "rotate(15deg)" }}
        transition="all 0.4s ease"
      />

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
          as={motion.div}
          whileHover={{ scale: 1.05 }}
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
    </Box>
  );
};

export default GlobalSalawatCount;
