"use client";

import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Container,
  useColorModeValue,
  keyframes,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHeart, FaMosque, FaStar } from "react-icons/fa";

const MotionBox = motion(Box);

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export default function Home() {
  const bgColor = useColorModeValue("green.50", "green.900");
  const textColor = useColorModeValue("green.800", "green.100");
  const accentColor = useColorModeValue("green.600", "green.300");

  return (
    <Box bg={bgColor} minH="100vh" overflow="hidden" position="relative">
      {/* Background decorations */}
      <Box position="absolute" top="5%" left="5%" opacity={0.1}>
        <Icon as={FaMosque} w={20} h={20} color={accentColor} />
      </Box>
      <Box position="absolute" bottom="10%" right="5%" opacity={0.1}>
        <Icon as={FaStar} w={16} h={16} color={accentColor} />
      </Box>

      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          minH="100vh"
          py={10}
        >
          <VStack
            spacing={8}
            align="flex-start"
            flex={1}
            pr={{ base: 0, md: 8 }}
          >
            <Heading
              as={motion.h1}
              size="2xl"
              color={textColor}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Welcome to the Salawat App
            </Heading>
            <Text
              fontSize="xl"
              color={textColor}
              as={motion.p}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Embrace the love for Prophet Muhammad ﷺ through the blessed
              practice of reciting Salawat.
            </Text>
            <Text
              fontSize="lg"
              color={accentColor}
              fontStyle="italic"
              as={motion.p}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              &rdquo;Indeed, Allah and His angels send blessings upon the
              Prophet. O you who have believed, ask [Allah to confer] blessing
              upon him and ask [Allah to grant him] peace.&rdquo; [Quran 33:56]
            </Text>
            <Button
              as={Link}
              href="/salawat"
              size="lg"
              colorScheme="green"
              _hover={{ bg: "green.500", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              leftIcon={<FaHeart />}
            >
              Start Reciting Salawat
            </Button>
          </VStack>
          <Box flex={1} mt={{ base: 8, md: 0 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/madinah.jpeg"
                alt="Masjid al-Nabawi in Madinah"
                borderRadius="lg"
                boxShadow="2xl"
              />
            </MotionBox>
          </Box>
        </Flex>
      </Container>

      {/* Floating hearts */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        animation={`${float} 3s ease-in-out infinite`}
      >
        <Icon as={FaHeart} w={6} h={6} color="red.400" />
      </Box>
      <Box
        position="absolute"
        top="60%"
        right="15%"
        animation={`${float} 4s ease-in-out infinite`}
      >
        <Icon as={FaHeart} w={4} h={4} color="red.300" />
      </Box>
      <Box
        position="absolute"
        bottom="15%"
        left="20%"
        animation={`${float} 5s ease-in-out infinite`}
      >
        <Icon as={FaHeart} w={5} h={5} color="red.500" />
      </Box>
    </Box>
  );
}
