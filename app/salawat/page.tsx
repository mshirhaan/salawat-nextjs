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
  useColorModeValue,
  Container,
  SimpleGrid,
  Collapse,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  InfoIcon,
  EditIcon,
  SearchIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import { BsPinFill, BsPin } from "react-icons/bs";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // Adjust the import path as needed
import { useAuth } from "@/contexts/AuthContext";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride"; // Import Joyride
import React from "react";

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
  benefits?: string[];
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
  const [openBenefits, setOpenBenefits] = useState<{ [key: string]: boolean }>(
    {}
  );
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

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const headingColor = useColorModeValue("#5d4037", "#d7ccc8");
  const gradientBg = useColorModeValue(
    "linear-gradient(to right, #f2e6d9, #e6ccb3)",
    "linear-gradient(to right, #3e2723, #4e342e)"
  );
  const hoverBgColor = useColorModeValue("teal.50", "teal.900");
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");

  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 });

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
    setDailyTarget(userTargets[salawat.id]?.target || 0);
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

  const toggleBenefits = (salawatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenBenefits((prev) => ({
      ...prev,
      [salawatId]: !prev[salawatId],
    }));
  };

  return (
    <Box bg={bgColor} minHeight="100vh">
      <Joyride
        steps={tourSteps}
        continuous
        showSkipButton
        showProgress
        scrollToFirstStep
        run={isTourOpen}
        callback={handleTourCallback}
        styles={{
          options: {
            primaryColor: useColorModeValue("#38B2AC", "#81E6D9"),
          },
        }}
      />

      <Box
        bg={gradientBg}
        py={16}
        px={8}
        mb={12}
        borderRadius="lg"
        boxShadow="xl"
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

        <Container maxW="container.xl" position="relative" zIndex={1}>
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            color={headingColor}
            fontWeight="bold"
            fontFamily="'Amiri', serif"
            mb={4}
          >
            📿 صلوا علی الحبیب ﷺ
          </Heading>
          <Text
            textAlign="center"
            color={textColor}
            fontSize="xl"
            fontWeight="medium"
            textShadow="1px 1px 2px rgba(0, 0, 0, 0.6)"
          >
            Blessings from The Enlightened City
          </Text>
        </Container>
      </Box>

      <Container maxW="container.xl" px={4} pb={4}>
        <Box mb={8} position="relative">
          <Input
            placeholder="Search Salawat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            variant="filled"
            bg={cardBgColor}
            pr="4rem"
            className="search-input"
          />
          <IconButton
            icon={<SearchIcon />}
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            aria-label="Search"
            variant="ghost"
          />
        </Box>

        {loading ? (
          <Flex justify="center" align="center" height="50vh">
            <Spinner size="xl" color="teal.500" thickness="4px" />
          </Flex>
        ) : (
          <SimpleGrid columns={columnCount} spacing={6}>
            {filteredSalawatList
              .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
              .map((salawat) => {
                const progress = userTargets[salawat.id]?.progress[today] || 0;
                const target = userTargets[salawat.id]?.target || 0;
                const progressPercentage =
                  target > 0 ? (progress / target) * 100 : 0;
                const firstLineArabic = salawat.lines[0]?.arabic || "";
                debugger;
                return (
                  <Box
                    key={salawat.id}
                    p={6}
                    borderWidth={1}
                    borderRadius="lg"
                    bg={cardBgColor}
                    boxShadow="md"
                    _hover={{
                      boxShadow: "lg",
                      bg: hoverBgColor,
                      transform: "translateY(-4px)",
                      transition: "all 0.3s ease",
                    }}
                    cursor="pointer"
                    onClick={() => handleCardClick(salawat.id)}
                    className="salawat-card"
                    position="relative"
                  >
                    {salawat.pinned && (
                      <StarIcon
                        position="absolute"
                        top={2}
                        right={2}
                        color="yellow.400"
                      />
                    )}
                    <VStack align="stretch" spacing={4}>
                      <Heading size="md" color={textColor}>
                        {salawat.title}
                      </Heading>
                      {salawat.description && (
                        <Text fontSize="sm" color={mutedTextColor}>
                          {salawat.description}
                        </Text>
                      )}
                      <Text
                        fontSize="lg"
                        color={textColor}
                        fontFamily="'Uthmanic', 'Amiri', serif"
                        dir="rtl"
                        noOfLines={2}
                        textAlign="right"
                        title={firstLineArabic}
                      >
                        {firstLineArabic}
                      </Text>
                      {isLoggedIn && target > 0 && (
                        <Box>
                          {progressPercentage >= 100 ? (
                            <Flex
                              align="center"
                              justify="center"
                              direction="column"
                            >
                              <Badge
                                colorScheme="green"
                                fontSize="md"
                                p={2}
                                borderRadius="md"
                                width="100%"
                                textAlign="center"
                              >
                                Completed
                              </Badge>
                              <Text fontSize="sm">
                                You have completed your target for today!
                              </Text>
                            </Flex>
                          ) : (
                            <VStack spacing={2}>
                              <Flex
                                align="center"
                                justify="space-between"
                                width="100%"
                              >
                                <Text fontSize="sm">Progress</Text>
                                <Text fontSize="sm" fontWeight="bold">
                                  {progress} / {target}
                                </Text>
                              </Flex>
                              <Progress
                                value={progressPercentage}
                                size="sm"
                                colorScheme="teal"
                                width="100%"
                                borderRadius="full"
                                hasStripe
                                isAnimated
                                className="progress-bar"
                              />
                            </VStack>
                          )}
                        </Box>
                      )}
                      {salawat.benefits && salawat.benefits.length > 0 && (
                        <VStack align="stretch" mt={4}>
                          <Button
                            onClick={(e) => toggleBenefits(salawat.id, e)}
                            variant="ghost"
                            rightIcon={
                              openBenefits[salawat.id] ? (
                                <ChevronUpIcon />
                              ) : (
                                <ChevronDownIcon />
                              )
                            }
                            size="sm"
                          >
                            {openBenefits[salawat.id]
                              ? "Hide Benefits"
                              : "Show Benefits"}
                          </Button>
                          <Collapse
                            in={openBenefits[salawat.id]}
                            animateOpacity
                          >
                            <List spacing={2} mt={2}>
                              {salawat.benefits.map((benefit, index) => (
                                <ListItem key={index}>
                                  <ListIcon as={CheckIcon} color="green.500" />
                                  {benefit}
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        </VStack>
                      )}
                      <HStack justify="flex-end" spacing={2}>
                        {isLoggedIn && (
                          <Tooltip label="Edit target">
                            <IconButton
                              size="sm"
                              variant="outline"
                              aria-label="Edit target"
                              icon={<EditIcon />}
                              colorScheme="teal"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetTargetClick(salawat);
                              }}
                              className="edit-target-button"
                            />
                          </Tooltip>
                        )}
                        <Tooltip label={salawat.pinned ? "Unpin" : "Pin"}>
                          <IconButton
                            size="sm"
                            variant="outline"
                            aria-label={salawat.pinned ? "Unpin" : "Pin"}
                            icon={salawat.pinned ? <BsPinFill /> : <BsPin />}
                            colorScheme="teal"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePin(salawat.id);
                            }}
                            className="pin-button"
                          />
                        </Tooltip>
                      </HStack>
                    </VStack>
                  </Box>
                );
              })}
          </SimpleGrid>
        )}
      </Container>

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
            <Text fontSize="sm" color={mutedTextColor}>
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
