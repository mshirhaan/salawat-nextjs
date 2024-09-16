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

// Create keyframes for floating upwards and fading out
const floatUpwards = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  50% { opacity: 0.7; }
  100% { transform: translateY(-100px); opacity: 0; }
`;

export default function EidMiladBanner() {
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
      {/* Floating hearts */}
      <MotionBox
        position="absolute"
        top="30%"
        left="15%"
        animation={`${floatUpwards} 4s ease-in-out infinite`}
      >
        <Icon as={FaHeart} w={8} h={8} color="red.300" />
      </MotionBox>
      <MotionBox
        position="absolute"
        bottom="15%"
        right="20%"
        animation={`${floatUpwards} 5s ease-in-out infinite`}
      >
        <Icon as={FaHeart} w={6} h={6} color="red.500" />
      </MotionBox>
      <MotionBox
        position="absolute"
        top="40%"
        left="35%"
        animation={`${floatUpwards} 4.5s ease-in-out infinite`}
      >
        <Icon as={FaHeart} w={10} h={10} color="red.300" />
      </MotionBox>
      <MotionBox
        position="absolute"
        bottom="25%"
        right="30%"
        animation={`${floatUpwards} 3.5s ease-in-out infinite`}
      >
        <Icon as={FaHeart} w={7} h={7} color="red.400" />
      </MotionBox>

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
