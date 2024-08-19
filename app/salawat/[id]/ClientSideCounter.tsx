"use client";

import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { logRecitation, updateUserSalawatCount } from "../../../lib/user";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { InfoIcon } from "@chakra-ui/icons"; // Import the info icon or any other icon you prefer
import { useNotification } from "@/contexts/NotificationContext";

interface ClientSideCounterProps {
  salawatId: string;
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
}: ClientSideCounterProps) {
  const [totalCount, setTotalCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);

  //for voice recognition
  const [isListening, setIsListening] = useState(false);

  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure(); // For managing drawer open/close
  const { showNotification } = useNotification();

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
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    const newTotalCount = totalCount + 1;
    setTotalCount(newTotalCount);
    setDailyCount(dailyCount + 1);
    setWeeklyCount(weeklyCount + 1);
    setMonthlyCount(monthlyCount + 1);

    localStorage.setItem(`salawatCount_${salawatId}`, newTotalCount.toString());

    if (user) {
      await updateUserSalawatCount(user.uid, salawatId, 1);
      await logRecitation(user.uid, showNotification); // Log the recitation
    }
  };

  //for voice recognition
  const startListening = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      console.error("Speech Recognition API not supported.");
      return;
    }

    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "ar-SA"; // Set language to Arabic (Saudi Arabia)

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      if (event.results.length > 0) {
        const transcript =
          event.results[event.results.length - 1][0].transcript.trim();
        if (transcript === "سلام") {
          handleCount();
        }
      }
    };

    recognition.onerror = (error: any) => {
      console.error("Speech recognition error:", error);
    };

    recognition.start();
  };

  //for voice recognition
  const stopListening = () => {
    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.stop();
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
          colorScheme="teal"
          variant="solid"
          borderRadius="full"
          width="90px"
          height="90px"
          boxShadow="md"
          _hover={{ bg: "teal.600" }}
          _focus={{ boxShadow: "outline" }}
          transition="background-color 0.3s ease, transform 0.3s ease"
          _active={{ transform: "scale(0.95)" }}
          fontSize="xl"
          fontWeight="bold"
        >
          <Text color="white">{dailyCount}</Text>
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
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Salawat Count Details</DrawerHeader>

            <DrawerBody>
              <VStack spacing={4} align="start">
                <HStack spacing={4}>
                  <VStack>
                    <Text fontSize="sm" fontWeight="bold">
                      Today
                    </Text>
                    <Text fontSize="md">{dailyCount}</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="sm" fontWeight="bold">
                      This Week
                    </Text>
                    <Text fontSize="md">{weeklyCount}</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="sm" fontWeight="bold">
                      This Month
                    </Text>
                    <Text fontSize="md">{monthlyCount}</Text>
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

        {/* //for voice recognition - Start Listening Button */}
        <Button
          onClick={startListening}
          size="sm"
          colorScheme="teal"
          variant="solid"
          borderRadius="full"
          width="80px"
          height="80px"
          boxShadow="md"
          _hover={{ bg: "teal.600" }}
          _focus={{ boxShadow: "outline" }}
          transition="background-color 0.3s ease, transform 0.3s ease"
          _active={{ transform: "scale(0.95)" }}
          fontSize="md"
        >
          Start Listening
        </Button>

        {/* //for voice recognition -  Stop Listening Button */}
        {isListening && (
          <Button
            onClick={stopListening}
            size="sm"
            colorScheme="red"
            variant="solid"
            borderRadius="full"
            width="80px"
            height="80px"
            boxShadow="md"
            _hover={{ bg: "red.600" }}
            _focus={{ boxShadow: "outline" }}
            transition="background-color 0.3s ease, transform 0.3s ease"
            _active={{ transform: "scale(0.95)" }}
            fontSize="md"
          >
            Stop
          </Button>
        )}
      </VStack>
    </Box>
  );
}
