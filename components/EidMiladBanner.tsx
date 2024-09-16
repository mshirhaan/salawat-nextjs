import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  keyframes,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

// Keyframes for floating upwards and fading out
const floatUpwards = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  50% { opacity: 0.7; }
  100% { transform: translateY(-100px); opacity: 0; }
`;

// Predefined colors for the hearts (added more colors)
const heartColors = [
  "red.300",
  "red.400",
  "red.500",
  "pink.300",
  "pink.400",
  "pink.500",
  "yellow.300",
  "yellow.400",
  "orange.300",
  "orange.400",
  "purple.300",
  "purple.400",
  "blue.300",
  "blue.400",
  "cyan.300",
  "cyan.400",
  "green.300", // Add soft green tones
  "green.400",
  "teal.300", // Teal tones
  "teal.400",
  "indigo.400", // Add indigo for depth
  "violet.300", // Add violet for a royal touch
  "rose.400", // Soft rose colors
  "lime.300", // Lighter lime color
];

// Function to pick a random color from the array
const getRandomColor = () =>
  heartColors[Math.floor(Math.random() * heartColors.length)];

const generateRandomHearts = (numHearts: number) => {
  return Array.from({ length: numHearts }, (_, i) => ({
    id: i,
    size: Math.random() * (32 - 8) + 8, // Random size between 8 and 32
    color: getRandomColor(),
    top: "100%", // Start from the bottom
    left: Math.random() * 100 + "%", // Random left position
    animationDuration: Math.random() * (6 - 3) + 3 + "s", // Random duration between 3s and 6s
  }));
};

export default function EidMiladBanner() {
  // Generate 20 hearts with random positions, sizes, and colors
  const hearts = generateRandomHearts(20);

  return (
    <Box
      w="full"
      bgGradient="linear(to-r, teal.500, green.400)"
      py={10}
      color="white"
      textAlign="center"
      mb={10}
      boxShadow="lg"
      borderRadius="lg"
      position="relative"
      overflow="hidden"
    >
      {/* Randomly generated floating hearts */}
      {hearts.map((heart) => (
        <MotionBox
          key={heart.id}
          position="absolute"
          top={heart.top}
          left={heart.left}
          animation={`${floatUpwards} ${heart.animationDuration} ease-in-out infinite`}
        >
          <Icon
            as={FaHeart}
            w={heart.size}
            h={heart.size}
            color={heart.color}
          />
        </MotionBox>
      ))}

      {/* Banner Content */}
      <VStack spacing={4} position="relative" zIndex={1}>
        <Heading fontSize={{ base: "3xl", md: "4xl" }}>
          Eid Milad Un Nabi ﷺ Mubarak!
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} px={5}>
          May the blessings and peace of Allah be upon the Beloved Prophet
          Muhammad ﷺ. Celebrate His birth by sending Salawat.
        </Text>
        <Button
          as={Link}
          href="/salawat"
          size="lg"
          bg="white"
          color="green.600"
          _hover={{ bg: "green.500", color: "white" }}
          boxShadow="lg"
          leftIcon={<FaHeart />}
        >
          Recite Salawat Now
        </Button>
      </VStack>
    </Box>
  );
}
{
  /* <Box
        w="full"
        bgGradient="linear(to-r, teal.500, green.400)"
        py={10}
        color="white"
        textAlign="center"
        mb={10}
        boxShadow="lg"
        borderRadius="lg"
        position="relative"
        overflow="hidden"
      >
       
        <Box
          position="absolute"
          top="10%"
          left="15%"
          animation={`${float} 4s ease-in-out infinite`}
          opacity={Math.random()}
        >
          <Icon as={FaHeart} w={8} h={8} color="red.300" />
        </Box>
        <Box
          position="absolute"
          bottom="15%"
          right="20%"
          animation={`${float} 5s ease-in-out infinite`}
          opacity={Math.random()}
        >
          <Icon as={FaHeart} w={6} h={6} color="red.500" />
        </Box>
        <Box
          position="absolute"
          top="30%"
          left="35%"
          animation={`${float} 4.5s ease-in-out infinite`}
          opacity={Math.random()}
        >
          <Icon as={FaHeart} w={10} h={10} color="red.300" />
        </Box>
        <Box
          position="absolute"
          bottom="25%"
          right="30%"
          animation={`${float} 3.5s ease-in-out infinite`}
          opacity={Math.random()}
        >
          <Icon as={FaHeart} w={7} h={7} color="red.400" />
        </Box>

       
        <VStack spacing={4} position="relative" zIndex={1}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }}>
            Eid Milad Un Nabi ﷺ Mubarak!
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} px={5}>
            May the blessings and peace of Allah be upon the Beloved Prophet
            Muhammad ﷺ. Celebrate His birth by sending Salawat.
          </Text>
          <Button
            as={Link}
            href="/salawat"
            size="lg"
            bg="white"
            color="green.600"
            _hover={{ bg: "green.500", color: "white" }}
            boxShadow="lg"
            leftIcon={<FaHeart />}
          >
            Recite Salawat Now
          </Button>
        </VStack>
      </Box> */
}
