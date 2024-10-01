"use client";

import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { logRecitation, updateUserSalawatCount } from "../../../lib/user";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { InfoIcon } from "@chakra-ui/icons"; // Import the info icon or any other icon you prefer
import { useNotification } from "@/contexts/NotificationContext";

interface ClientSideCounterProps {
  salawatId: string;
  size: number;
}

function getDayId(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function getWeekId(date: Date): string {
  const year = date.getFullYear();
  const weekNumber = getWeekNumber(date);
  return `${year}-W${weekNumber.toString().padStart(2, "0")}`;
}

function getMonthId(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export default function ClientSideCounter({
  salawatId,
  size,
}: ClientSideCounterProps) {
  const [totalCount, setTotalCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);

  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure(); // For managing drawer open/close
  const { showNotification } = useNotification();
  const toast = useToast(); // Chakra UI toast for notifications

  const lastClickTime = useRef<number>(0);
  const debounceDelay = 1000; // 1 second debounce delay

  // Theme-aware color values
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBgColor = useColorModeValue("teal.500", "teal.200");
  const buttonHoverBgColor = useColorModeValue("teal.600", "teal.300");
  const buttonTextColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchCounts = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          unsubscribe = onSnapshot(
            userDocRef,
            (docSnapshot) => {
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const dbTotalCount = userData.salawatCounts?.[salawatId] || 0;
                setTotalCount(dbTotalCount);

                const now = new Date();
                const dayId = getDayId(now);
                const weekId = getWeekId(now);
                const monthId = getMonthId(now);

                const dbDailyCount =
                  userData.dailySalawatCounts?.[dayId]?.[salawatId] || 0;
                setDailyCount(dbDailyCount);

                const dbWeeklyCount =
                  userData.weeklySalawatCounts?.[weekId]?.[salawatId] || 0;
                setWeeklyCount(dbWeeklyCount);

                const dbMonthlyCount =
                  userData.monthlySalawatCounts?.[monthId]?.[salawatId] || 0;
                setMonthlyCount(dbMonthlyCount);

                localStorage.setItem(
                  `salawatCount_${salawatId}`,
                  dbTotalCount.toString()
                );
              }
            },
            (error) => {
              console.error("Error fetching count from Firestore:", error);
              fallbackToLocalStorage();
            }
          );
        } catch (error) {
          console.error("Error setting up Firestore listener:", error);
          fallbackToLocalStorage();
        }
      } else {
        fallbackToLocalStorage();
      }
    };

    const fallbackToLocalStorage = () => {
      const storedCount = localStorage.getItem(`salawatCount_${salawatId}`);
      if (storedCount) {
        setTotalCount(parseInt(storedCount, 10));
      }
    };

    fetchCounts();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [salawatId, user]);

  const handleCount = async () => {
    const currentTime = Date.now();

    if (currentTime - lastClickTime.current > debounceDelay) {
      lastClickTime.current = currentTime;

      if (navigator.vibrate) {
        navigator.vibrate(100);
      }

      const newTotalCount = totalCount + 1;
      setTotalCount(newTotalCount);
      setDailyCount(dailyCount + 1);
      setWeeklyCount(weeklyCount + 1);
      setMonthlyCount(monthlyCount + 1);

      localStorage.setItem(
        `salawatCount_${salawatId}`,
        newTotalCount.toString()
      );

      if (user) {
        await updateUserSalawatCount(user.uid, salawatId, 1);
        await logRecitation(user.uid, showNotification); // Log the recitation
      }
    } else {
      toast({
        title: "Please wait",
        description: "You can click again after 1 second.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      position="fixed"
      bottom={{ base: "10%", md: "5%" }}
      left="50%"
      transform="translateX(-50%)"
      textAlign="center"
      zIndex={1}
      width="full"
      display="flex"
      justifyContent="center"
    >
      <VStack spacing={2}>
        <Button
          onClick={handleCount}
          size="lg"
          bg={buttonBgColor}
          color={buttonTextColor}
          variant="solid"
          borderRadius="full"
          width={size + "px"}
          height={size + "px"}
          boxShadow="md"
          _hover={{ bg: buttonHoverBgColor }}
          _focus={{ boxShadow: "outline" }}
          transition="background-color 0.3s ease, transform 0.3s ease"
          _active={{ transform: "scale(0.95)" }}
          fontSize="xl"
          fontWeight="bold"
          className="counter-button"
        >
          <Text>{dailyCount}</Text>
        </Button>

        {/* Info Button */}
        <Box position="absolute" top="10px" right="10px">
          <IconButton
            icon={<InfoIcon />}
            colorScheme="teal"
            aria-label="More Info"
            onClick={onOpen}
          />
        </Box>

        {/* Drawer for Count Details */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
          <DrawerOverlay />
          <DrawerContent bg={bgColor}>
            <DrawerCloseButton />
            <DrawerHeader color={textColor}>Salawat Count Details</DrawerHeader>

            <DrawerBody>
              <VStack spacing={4} align="start">
                <HStack spacing={4}>
                  <VStack>
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      Today
                    </Text>
                    <Text fontSize="md" color={textColor}>
                      {dailyCount}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      This Week
                    </Text>
                    <Text fontSize="md" color={textColor}>
                      {weeklyCount}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      This Month
                    </Text>
                    <Text fontSize="md" color={textColor}>
                      {monthlyCount}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </VStack>
    </Box>
  );
}
