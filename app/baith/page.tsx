"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const MotionBox = motion(Box);

const baiths = [
  {
    title: "Ashraqa Baith",
    description: "A beautiful Baith to uplift your spirit.",
    link: "/baith/ashraqa-baith",
  },
  {
    title: "Tala‘al Badru ‘Alayna",
    description: "The Full Moon Rose Over Us",
    link: "/baith/tala-al-badru-alayna-baith",
  },
  // Add more Baiths as needed
];

export default function BaithPage() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const accentColor = useColorModeValue("green.600", "green.400");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="container.xl">
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
              Explore Our Baiths
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              textAlign="center"
              color={textColor}
              maxW="2xl"
              mx="auto"
            >
              Discover and recite various Baiths that inspire and elevate your
              spiritual journey.
            </Text>
          </MotionBox>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {baiths.map((baith) => (
            <MotionBox
              key={baith.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              p={6}
              borderRadius="xl"
              bg={cardBgColor} // Use the stored card background color
              boxShadow="md"
              _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
            >
              <Heading size="lg" color={accentColor}>
                {baith.title}
              </Heading>
              <Text color={textColor} mt={2}>
                {baith.description}
              </Text>
              <Button
                as={Link}
                href={baith.link}
                mt={4}
                colorScheme="teal"
                rightIcon={<FaArrowRight />}
              >
                Recite Now
              </Button>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
