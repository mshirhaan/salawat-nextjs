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
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride"; // Import Joyride

interface SalawatLine {
  arabic: string;
}

interface SalawatData {
  id: string;
  title: string;
  lines: SalawatLine[];
  description?: string; // Optional description
  pinned?: boolean; // Add pinned property
  target?: number; // Add target property
  progress?: number; // Add progress property
}

const tourSteps: Step[] = [
  {
    target: "body",
    content: "Are you ready for a quick tour?",
    placement: "center",
  },
  {
    target: ".search-input",
    content: "Search for Salawat here to filter the list.",
    placement: "bottom",
  },
  {
    target: ".salawat-card",
    content: "Click on a Salawat card to view more details.",
    placement: "top",
  },
  {
    target: ".edit-target-button",
    content: "Click here to set or edit the daily target for this Salawat.",
    placement: "top",
  },
  {
    target: ".pin-button",
    content: "Pin your favorite Salawat for quick access.",
    placement: "top",
  },
  {
    target: ".progress-bar",
    content: "Track your progress towards your daily target here.",
    placement: "top",
  },
];

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
        console.log("Salawat data:", data);

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

  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    // Check local storage for tour status
    const hasSeenTour = localStorage.getItem("hasSeenSalawatsTour");
    if (!hasSeenTour) {
      // If not present, show the tour
      setIsTourOpen(true);
    }
  }, []);

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem("hasSeenSalawatsTour", "true");
      setIsTourOpen(false);
    }
  };

  return (
    <Box p={5} bg="gray.50" minHeight="100vh">
      <Joyride
        steps={tourSteps}
        continuous
        showSkipButton
        showProgress
        scrollToFirstStep
        run={isTourOpen}
        callback={handleTourCallback}
        styles={{
          beacon: {
            display: "none", // Hide the beacon completely
          },
        }}
      />

      <Box
        bg="linear-gradient(to right, #f2e6d9, #e6ccb3)"
        py={12} // Increased vertical padding
        px={6} // Added horizontal padding
        mb={8}
        borderRadius="lg"
        boxShadow="lg"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.5}
          bgImage="url('https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442474443-LCPHZCHS0V92RKB6O8W3/850_0662-HDR.jpeg')"
          bgRepeat="repeat"
          bgPosition="center"
          bgSize="cover"
        />
        <Heading
          as="h1"
          size={headingSize}
          textAlign="center"
          color="#5d4037"
          fontWeight="bold"
          fontFamily="'Amiri', serif"
          position="relative"
          zIndex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text as="span" fontSize="1.2em" mr={2}>
            📿
          </Text>
          صلوا علی الحبیب ﷺ
        </Heading>

        <Text
          textAlign="center"
          color="#ffffff"
          mt={4} // Adjusted margin top for spacing
          fontSize="lg"
          fontWeight="medium"
          position="relative"
          zIndex={1}
          textShadow="1px 1px 2px rgba(0, 0, 0, 0.6)"
        >
          Blessings from The Enlightened City
        </Text>
      </Box>

      <Box mb={6}>
        <Input
          placeholder="Search Salawat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="lg"
          variant="outline"
          bg="white"
          className="search-input"
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

              // Get the first line of Arabic text
              const firstLineArabic = salawat.lines[0]?.arabic || "";

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
                  className="salawat-card"
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
                      <Text
                        fontSize="md"
                        color="gray.800"
                        fontFamily="'Uthmanic', 'Amiri', serif"
                        dir="rtl"
                        noOfLines={1}
                        textAlign={"right"}
                        title={firstLineArabic}
                      >
                        {firstLineArabic}
                      </Text>
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
                            className="edit-target-button"
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
                          className="pin-button"
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
                            className="progress-bar"
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
