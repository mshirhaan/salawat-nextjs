"use client";

import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  useColorMode,
  useColorModeValue,
  IconButton,
  SimpleGrid,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  HStack,
  Avatar,
  AvatarGroup,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaMoon,
  FaSun,
  FaHeart,
  FaUserFriends,
  FaChartLine,
  FaPrayingHands,
  FaArrowRight,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CountUp from "react-countup";
import { IconType } from "react-icons";
import Link from "next/link";

const MotionBox = motion(Box);

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [totalSalawat, setTotalSalawat] = useState<number | null>(null);
  const [totalSalawatLoading, setTotalSalawatLoading] = useState<boolean>(true);

  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalUsersLoading, setTotalUsersLoading] = useState<boolean>(true);

  // Color modes
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const accentColor = useColorModeValue("green.600", "green.400");
  const statBg = useColorModeValue("teal.50", "gray.700");
  const verseBg = useColorModeValue("teal.50", "gray.800");
  const arabicColor = useColorModeValue("teal.800", "teal.200");

  // Fetch the total Salawat count globally
  useEffect(() => {
    const fetchTotalSalawat = async () => {
      setTotalSalawatLoading(true);
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
        setTotalSalawatLoading(false);
      }
    };

    fetchTotalSalawat();
  }, []);

  // Fetch the total users count globally
  useEffect(() => {
    const fetchTotalUsers = async () => {
      setTotalUsersLoading(true);
      try {
        const usersCollection = collection(db, "users");
        const userDocs = await getDocs(usersCollection);

        setTotalUsers(userDocs.size);
      } catch (error) {
        console.error("Error fetching total users count: ", error);
      } finally {
        setTotalUsersLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Main Content */}
      <Container maxW="container.xl" pt={24}>
        {/* Welcome and Verse Section */}
        <VStack spacing={6} mb={12}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              textAlign="center"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              bgGradient={`linear(to-r, ${accentColor}, teal.300)`}
              bgClip="text"
              mb={4}
            >
              Welcome to the Salawat App
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              textAlign="center"
              color={useColorModeValue("gray.600", "gray.300")}
              maxW="2xl"
              mx="auto"
            >
              A powerful tool to inspire and motivate your Salawat recitations
            </Text>
          </MotionBox>

          <Box
            bg={verseBg}
            p={8}
            borderRadius="xl"
            boxShadow="xl"
            textAlign="center"
            w="full"
          >
            <Text
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              fontFamily="'Uthmanic', 'Amiri', serif"
              mb={4}
              color={arabicColor}
              lineHeight={1.8}
            >
              إِنَّ ٱللَّهَ وَمَلَـٰٓئِكَتَهُۥ يُصَلُّونَ عَلَى ٱلنَّبِىِّ ۚ
              يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ صَلُّوا۟ عَلَيْهِ وَسَلِّمُوا۟
              تَسْلِيمًا
            </Text>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              fontStyle="italic"
              color={useColorModeValue("gray.600", "gray.300")}
            >
              &quot;Indeed, Allah and His angels send blessings upon the
              Prophet. O you who have believed, ask [Allah to confer] blessing
              upon him and ask [Allah to grant him] peace.&quot;
            </Text>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.400")}
              mt={2}
            >
              [Quran 33:56]
            </Text>
          </Box>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={12}
          alignItems="center"
        >
          {/* Left Column */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack align="start" spacing={8}>
              <Badge
                colorScheme="teal"
                fontSize="md"
                px={4}
                py={2}
                borderRadius="full"
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  Prophetic Love &nbsp; <FaHeart />
                </span>
              </Badge>
              <Heading
                as="h1"
                size="2xl"
                lineHeight="shorter"
                bgGradient={`linear(to-r, ${accentColor}, teal.300)`}
                bgClip="text"
              >
                Embrace the love for Prophet Muhammad ﷺ through the blessed
                practice of reciting Salawat.
              </Heading>
              <Text
                fontSize="xl"
                color={useColorModeValue("gray.600", "gray.300")}
              >
                Join a global community in sending blessings upon Prophet
                Muhammad ﷺ. Every Salawat brings you closer to the Prophet ﷺ.
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="md">
                  <StatLabel>Global Salawat Count</StatLabel>
                  {/* Animated Counter */}
                  <StatNumber color={accentColor}>
                    {!totalSalawatLoading && totalSalawat ? (
                      <CountUp end={totalSalawat} separator="," duration={2} />
                    ) : (
                      <Spinner size="xs" color="teal.500" />
                    )}
                  </StatNumber>
                  <StatHelpText>
                    <HStack>
                      <FaHeart color="red" />
                      <Text>
                        Since 1st Rabiul Awwal 1446 / 4th September 2024
                      </Text>
                    </HStack>
                  </StatHelpText>
                </Stat>
                <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="md">
                  <StatLabel>Active Reciters</StatLabel>

                  <StatNumber>
                    {!totalUsersLoading && totalUsers ? (
                      <CountUp end={totalUsers} separator="," duration={2} />
                    ) : (
                      <Spinner size="xs" />
                    )}
                  </StatNumber>
                  <StatHelpText>
                    <HStack>
                      <FaUserFriends />
                      <Text>From across the world</Text>
                    </HStack>
                  </StatHelpText>
                </Stat>
              </SimpleGrid>

              <Button
                as={Link}
                href="/salawat"
                size="lg"
                colorScheme="teal"
                rightIcon={<FaArrowRight />}
                px={8}
                py={7}
                fontSize="lg"
                w={{ base: "full", md: "auto" }}
              >
                Start Reciting Salawat
              </Button>
            </VStack>
          </MotionBox>

          {/* Right Column */}
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              position="relative"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
            >
              <Image
                src="/images/madinah.jpeg"
                alt="Masjid al-Nabawi"
                w="full"
                h="auto"
                objectFit="cover"
                transform="scale(1.02)"
                transition="transform 0.3s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                p={6}
              >
                <VStack align="start" spacing={2}>
                  <Heading color="white" size="md">
                    Masjid al-Nabawi
                  </Heading>
                  <Text color="gray.200">
                    The blessed resting place of Prophet Muhammad ﷺ in Madinah
                  </Text>
                </VStack>
              </Box>
            </Box>
          </MotionBox>
        </SimpleGrid>

        <Divider my={16} />

        {/* Features Section */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
          <FeatureCard
            icon={FaHeart}
            title="Spiritual Benefits"
            description="Learn about the countless blessings and rewards of sending Salawat upon the Prophet ﷺ."
          />
          <FeatureCard
            icon={FaUserFriends}
            title="Global Community"
            description="Connect with believers worldwide."
          />
          <FeatureCard
            icon={FaChartLine}
            title="Track Progress"
            description="Monitor your journey with intuitive stats and achieve your Salawat goals."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType;
  title: string;
  description: string;
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const iconBg = useColorModeValue("teal.50", "gray.700");

  return (
    <VStack
      bg={cardBg}
      p={6}
      borderRadius="xl"
      boxShadow="xl"
      spacing={4}
      align="start"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-5px)" }}
    >
      <Box bg={iconBg} p={3} borderRadius="lg">
        <Icon size={24} color="teal" />
      </Box>
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")}>
        {description}
      </Text>
    </VStack>
  );
};
