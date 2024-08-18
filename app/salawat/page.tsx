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
  IconButton,
  Tooltip,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { InfoIcon } from "@chakra-ui/icons";
import { BsPinFill, BsPin } from "react-icons/bs";

interface SalawatData {
  id: string;
  title: string;
  description?: string; // Optional description
  pinned?: boolean; // Add pinned property
}

export default function HomePage() {
  const [salawatList, setSalawatList] = useState<SalawatData[]>([]);
  const [filteredSalawatList, setFilteredSalawatList] = useState<SalawatData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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

        // Load pinned state from localStorage
        const pinnedItems = JSON.parse(
          localStorage.getItem("pinnedSalawat") || "[]"
        );

        // Mark pinned items
        const updatedData = data.map((item: SalawatData) => ({
          ...item,
          pinned: pinnedItems.includes(item.id),
        }));

        setSalawatList(updatedData);
        setFilteredSalawatList(updatedData);
      } catch (error) {
        console.error("Error fetching Salawat list:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSalawatList();
  }, []);

  useEffect(() => {
    // Filter salawatList based on searchQuery
    const filtered = salawatList.filter(
      (salawat) =>
        salawat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (salawat.description &&
          salawat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredSalawatList(filtered);
  }, [searchQuery, salawatList]);

  const handleItemClick = (id: string) => {
    router.push(`/salawat/${id}`);
  };

  const togglePin = (id: string) => {
    setSalawatList((prevList) => {
      const updatedList = prevList.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      );

      // Save pinned state to localStorage
      const pinnedItems = updatedList
        .filter((item) => item.pinned)
        .map((item) => item.id);
      localStorage.setItem("pinnedSalawat", JSON.stringify(pinnedItems));

      return updatedList;
    });
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
      <Box mb={6}>
        <Input
          placeholder="Search Salawat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="lg"
          variant="outline"
          bg="white"
        />
      </Box>
      {loading ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="lg" color="teal.500" />
        </Flex>
      ) : (
        <VStack spacing={4} align="stretch">
          {filteredSalawatList
            .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) // Pin items to the top
            .map((salawat) => (
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
                    <IconButton
                      aria-label={salawat.pinned ? "Unpin" : "Pin"}
                      icon={salawat.pinned ? <BsPinFill /> : <BsPin />}
                      variant="outline"
                      colorScheme={salawat.pinned ? "yellow" : "gray"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering item click
                        togglePin(salawat.id);
                      }}
                    />
                  </HStack>
                  <Divider />
                  <Text color="gray.600">
                    {salawat.description ||
                      "Tap to start reciting this Salawat!"}
                  </Text>
                </VStack>
              </Box>
            ))}
        </VStack>
      )}
    </Box>
  );
}
