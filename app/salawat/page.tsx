// app/salawat/page.tsx

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  NumberInput,
  NumberInputField,
  useDisclosure,
  useToast,
  Progress,
  Badge,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { InfoIcon, EditIcon } from "@chakra-ui/icons";
import { BsPinFill, BsPin } from "react-icons/bs";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // Adjust the import path as needed
import { useAuth } from "@/contexts/AuthContext";

interface SalawatData {
  id: string;
  title: string;
  description?: string; // Optional description
  pinned?: boolean; // Add pinned property
  target?: number; // Add target property
  progress?: number; // Add progress property
}

export default function HomePage() {
  const { user } = useAuth();
  const [salawatList, setSalawatList] = useState<SalawatData[]>([]);
  const [filteredSalawatList, setFilteredSalawatList] = useState<SalawatData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSalawat, setSelectedSalawat] = useState<SalawatData | null>(
    null
  );
  const [dailyTarget, setDailyTarget] = useState(0);
  const [userTargets, setUserTargets] = useState<{
    [key: string]: { target: number; progress: { [date: string]: number } };
  }>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user authentication
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { colors } = useTheme();
  const toast = useToast();
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

        // Update salawatList with pinned state
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

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      // Fetch user's targets from Firebase
      const fetchUserTargets = async () => {
        try {
          const userId = user.uid;
          const userRef = doc(db, "users", userId);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          setUserTargets(userData?.dailySalawatTargets || {});
        } catch (error) {
          console.error("Error fetching user targets:", error);
        }
      };

      fetchUserTargets();
    } else {
      setIsLoggedIn(false);
      setUserTargets({});
    }
  }, [user]);

  const handleReadClick = (salawat: SalawatData) => {
    router.push(`/salawat/${salawat.id}`);
  };

  const handleSetTargetClick = (salawat: SalawatData) => {
    setSelectedSalawat(salawat);
    onOpen();
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

  const handleSetTarget = async () => {
    if (!selectedSalawat || dailyTarget <= 0) {
      toast({
        title: "Invalid target.",
        description: "Please set a valid daily target.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const userId = auth.currentUser?.uid; // Use currentUser from auth
      if (!userId) {
        toast({
          title: "Error.",
          description: "No user logged in.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const userRef = doc(db, "users", userId);

      // Update the user's dailySalawatTargets in Firebase
      await updateDoc(userRef, {
        [`dailySalawatTargets.${selectedSalawat.id}`]: {
          target: dailyTarget,
          progress: {}, // Initialize progress
        },
      });

      toast({
        title: "Daily target set.",
        description: `Your daily target for ${selectedSalawat.title} has been set to ${dailyTarget}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setUserTargets((prevTargets) => ({
        ...prevTargets,
        [selectedSalawat.id]: { target: dailyTarget, progress: {} },
      }));

      onClose();
    } catch (error) {
      console.error("Error setting daily target:", error);
      toast({
        title: "Error.",
        description: "There was an error setting the daily target.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const handleCardClick = (salawatId: string) => {
    router.push(`/salawat/${salawatId}`);
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
          <Spinner size="xl" color="teal.500" />
        </Flex>
      ) : (
        <VStack spacing={4} align="stretch">
          {filteredSalawatList
            .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) // Pin items to the top
            .map((salawat) => {
              const progress = userTargets[salawat.id]?.progress[today] || 0;
              const target = userTargets[salawat.id]?.target || 0;
              const progressPercentage =
                target > 0 ? (progress / target) * 100 : 0;

              return (
                <Box
                  key={salawat.id}
                  p={itemPadding}
                  borderWidth={1}
                  borderRadius={itemBorderRadius}
                  bg="white"
                  boxShadow="md"
                  _hover={{
                    boxShadow: "lg",
                    bg: colors.teal[50],
                    transform: "scale(1.02)",
                    transition: "all 0.3s ease",
                  }}
                  cursor="pointer"
                  onClick={() => handleCardClick(salawat.id)}
                >
                  <HStack justify="space-between">
                    <Box>
                      <Heading size="md" mb={1}>
                        {salawat.title}
                      </Heading>
                      {salawat.description && (
                        <Text fontSize="sm" color="gray.600">
                          {salawat.description}
                        </Text>
                      )}
                    </Box>
                    <HStack spacing={2}>
                      {isLoggedIn && (
                        <Tooltip label="Edit target">
                          <IconButton
                            variant="ghost"
                            aria-label="Edit target"
                            icon={<EditIcon />}
                            colorScheme="teal"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents click event from propagating to the Box
                              handleSetTargetClick(salawat);
                            }}
                          />
                        </Tooltip>
                      )}
                      <Tooltip label={salawat.pinned ? "Unpin" : "Pin"}>
                        <IconButton
                          variant="ghost"
                          aria-label={salawat.pinned ? "Unpin" : "Pin"}
                          icon={salawat.pinned ? <BsPinFill /> : <BsPin />}
                          colorScheme="teal"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents click event from propagating to the Box
                            togglePin(salawat.id);
                          }}
                        />
                      </Tooltip>
                    </HStack>
                  </HStack>

                  {isLoggedIn && target > 0 && (
                    <>
                      <Divider my={3} />
                      {progressPercentage >= 100 ? (
                        <Flex
                          align="center"
                          justify="center"
                          direction="column"
                        >
                          <Badge colorScheme="green" fontSize="md" mb={2}>
                            Completed
                          </Badge>
                          <Text fontSize="sm" color="gray.600">
                            You have completed your target for today!
                          </Text>
                        </Flex>
                      ) : (
                        <>
                          <Flex align="center" justify="space-between">
                            <Text fontSize="sm" color="gray.600">
                              Progress
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {progress} / {target}
                            </Text>
                          </Flex>
                          <Progress
                            value={progressPercentage}
                            size="sm"
                            colorScheme="teal"
                            mt={2}
                            hasStripe
                            isAnimated
                          />
                        </>
                      )}
                    </>
                  )}
                </Box>
              );
            })}
        </VStack>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Set Daily Target for {selectedSalawat?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NumberInput
              value={dailyTarget}
              min={0}
              onChange={(value) => setDailyTarget(Number(value))}
              mb={4}
            >
              <NumberInputField placeholder="Daily Target" />
            </NumberInput>
            <Text fontSize="sm" color="gray.500">
              Set a daily target for {selectedSalawat?.title}. This will help
              track your progress.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSetTarget}>
              Set Target
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
