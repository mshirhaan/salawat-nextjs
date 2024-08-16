"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  useBreakpointValue,
  useTheme,
  VStack,
  HStack,
  Divider,
  Spinner,
  Flex,
  Badge,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { InfoIcon } from "@chakra-ui/icons";

interface SalawatData {
  id: string;
  title: string;
  description?: string; // Optional description
}

export default function HomePage() {
  const [salawatList, setSalawatList] = useState<SalawatData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { colors } = useTheme();
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const itemPadding = useBreakpointValue({ base: 4, md: 6 });
  const itemBorderRadius = useBreakpointValue({ base: "md", md: "lg" });

  useEffect(() => {
    async function fetchSalawatList() {
      try {
        const response = await fetch("/api/salawat");
        const data = await response.json();
        setSalawatList(data);
      } catch (error) {
        console.error("Error fetching Salawat list:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSalawatList();
  }, []);

  const handleItemClick = (id: string) => {
    router.push(`/salawat/${id}`);
  };

  return (
    <Box p={5} bg="gray.50" minHeight="100vh">
      <Heading
        as="h1"
        size={headingSize}
        mb={8}
        textAlign="center"
        color="teal.400"
      >
        Explore Salawat
      </Heading>
      {loading ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="lg" color="teal.500" />
        </Flex>
      ) : (
        <VStack spacing={4} align="stretch">
          {salawatList.map((salawat) => (
            <Box
              key={salawat.id}
              p={itemPadding}
              borderWidth={1}
              borderRadius={itemBorderRadius}
              bg="white"
              boxShadow="md"
              cursor="pointer"
              _hover={{
                boxShadow: "xl",
                bg: colors.teal[50],
                transform: "scale(1.02)",
                transition: "all 0.3s ease",
              }}
              onClick={() => handleItemClick(salawat.id)}
            >
              <VStack spacing={2} align="start">
                <HStack justify="space-between" w="full">
                  <Heading as="h3" size="lg" color="teal.600">
                    {salawat.title}
                  </Heading>
                  {salawat.description && (
                    <Tooltip label={salawat.description} placement="top">
                      <IconButton
                        aria-label="More info"
                        icon={<InfoIcon />}
                        variant="outline"
                        colorScheme="teal"
                        size="sm"
                      />
                    </Tooltip>
                  )}
                </HStack>
                <Divider />
                <Text color="gray.600">
                  {salawat.description || "Tap to start reciting this Salawat!"}
                </Text>
              </VStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
