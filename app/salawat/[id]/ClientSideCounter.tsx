// app/salawat/[id]/ClientSideCounter.tsx
"use client";

import { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { logRecitation, updateUserSalawatCount } from "../../../lib/user";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface ClientSideCounterProps {
  salawatId: string;
}

export default function ClientSideCounter({
  salawatId,
}: ClientSideCounterProps) {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const storedCount = localStorage.getItem(`salawatCount_${salawatId}`);
    if (storedCount) {
      setCount(parseInt(storedCount, 10));
    }
  }, [salawatId]);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchCount = async () => {
      if (user) {
        try {
          // Set up real-time listener for the user's salawat count
          const userDocRef = doc(db, "users", user.uid);
          unsubscribe = onSnapshot(
            userDocRef,
            (docSnapshot) => {
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const dbCount = userData.salawatCounts?.[salawatId] || 0;
                setCount(dbCount);
                // Update localStorage as a backup
                localStorage.setItem(
                  `salawatCount_${salawatId}`,
                  dbCount.toString()
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
        setCount(parseInt(storedCount, 10));
      }
    };

    fetchCount();

    // Cleanup function
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
    setCount((prevCount) => {
      localStorage.setItem(
        `salawatCount_${salawatId}`,
        (prevCount + 1).toString()
      );
      return prevCount + 1;
    });

    if (user) {
      await updateUserSalawatCount(user.uid, salawatId, 1);
      await logRecitation(user.uid); // Log the recitation
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
        <Text color="white">{count}</Text>
      </Button>
    </Box>
  );
}
