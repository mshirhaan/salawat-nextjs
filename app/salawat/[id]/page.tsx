//salawat/[id]/page.tsx

"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  Tooltip,
  Select,
  Stack,
  Divider,
  Spinner,
  Flex,
} from "@chakra-ui/react";

import { ReactNode, Suspense, useEffect, useState } from "react";

import { db } from "@/lib/firebase";
import ClientSideCounter from "./ClientSideCounter";
import TooltipWithTouch from "./TooltipWithTouch";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  sum,
} from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/components/Login";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
interface SalawatWord {
  word: string;
  translations: { [key: string]: string };
}

interface SalawatLine {
  arabic: string;
  translations: { [key: string]: string };
  words: SalawatWord[];
}

interface SalawatData {
  title: string;
  lines: SalawatLine[];
}

async function fetchSalawatData(id: string) {
  const salawat = await getSalawatData(id);
  return salawat;
}
async function getSalawatData(id: string): Promise<SalawatData> {
  const salawatRef = doc(db, "salawat", id);
  const salawatSnap = await getDoc(salawatRef);

  if (!salawatSnap.exists()) {
    throw new Error("Salawat not found");
  }

  return salawatSnap.data() as SalawatData;
}

const MotionBox = motion(Box);
export default function SalawatPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [salawat, setSalawat] = useState<SalawatData | null>(null);
  const [totalSubmittedCount, setTotalSubmittedCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const language = "en";

  const imageUrls = [
    "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442776595-FLQNT4Y1P9WW6X9R4VD7/DJI_0062.jpeg",
    "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442608579-7GBAJE6ZC55EC3Z2WDKW/850_4393-HDR.jpeg",
    "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442626013-QJOFHH3B2HUOCYN6E0GV/850_5158.jpeg",
  ];

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    async function loadData() {
      if (params.id) {
        const data = await fetchSalawatData(params.id as string);
        setSalawat(data);
      }
    }
    loadData();
  }, [params.id]);

  useEffect(() => {
    async function fetchTotalCount() {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where(`salawatCounts.${params.id}`, ">", 0));
      const querySnapshot = await getDocs(q);
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().salawatCounts[params.id];
      });
      setTotalSubmittedCount(total);
    }
    fetchTotalCount();
  }, [params.id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(intervalId);
  }, [imageUrls.length]);

  const renderArabicTextWithTooltips = (
    arabicText: string,
    words: SalawatWord[]
  ) => {
    const wordMap = new Map(
      words.map((word) => [
        word.word,
        (word.translations && word.translations[language]) || "",
      ])
    );

    return (
      <Text
        fontFamily="'Uthmanic', 'Amiri', serif"
        fontSize="4xl"
        color="white"
        textAlign="center"
        lineHeight="1.8"
      >
        {arabicText.split(" ").map((word, index) => (
          <Suspense key={index} fallback={<span>{word} </span>}>
            <TooltipWithTouch label={wordMap.get(word) || ""} hasArrow>
              <Text
                as="span"
                display="inline"
                cursor="pointer"
                _hover={{ color: "teal.500" }}
                transition="color 0.3s ease"
              >
                {word}
              </Text>
            </TooltipWithTouch>{" "}
          </Suspense>
        ))}
      </Text>
    );
  };

  if (!user) {
    return <Login />;
  }

  if (!salawat) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="lg" color="teal.500" />
      </Flex>
    );
  }

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      {/* Video Background */}
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        // src="https://cdn.pixabay.com/video/2022/03/30/112361-694236354_large.mp4"
        src="https://cdn.pixabay.com/video/2024/01/26/198164-906869460_large.mp4"
        style={{
          position: "fixed", // Changed to fixed
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      /> */}

       {/* Image Background */}
       {imageUrls.map((url, index) => (
        <MotionBox
          key={index}
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundImage={`url(${url})`}
          backgroundSize="cover"
          backgroundPosition="center"
          zIndex={-2}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageIndex === index ? 1 : 0 }}
          transition={{ opacity: { duration: 2, ease: "easeInOut" } }}
        />
      ))}

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        background="rgba(0, 0, 0, 0.5)" // Semi-transparent overlay
        zIndex={0}
      />

      {/* Content */}
      <Box
        position="relative"
        zIndex={1}
        p={5}
        height="calc(100vh - 100px)" // Adjust height to leave space for the button
        overflowY="auto" // Scrollable content
        pb="100px" // Space for the button
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="white">
          {salawat.title}
        </Heading>
        {/* <Stack spacing={4} mb={6} align="center">
              <Select
                width="auto"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                variant="outline"
                placeholder="Select Language"
                size="lg"
                color="white"
                borderColor="white"
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </Select>
            </Stack> */}
        {salawat.lines.map((line, index) => (
          <Box key={index} mb={6}>
            {renderArabicTextWithTooltips(line.arabic, line.words)}
            <Text mb={4} fontSize="md" color="gray.200" textAlign="center">
              {line.translations[language]}
            </Text>
            {index < salawat.lines.length - 1 && (
              <Divider my={4} borderColor="gray.200" />
            )}
          </Box>
        ))}

        {/* Improved Button with Vibration */}
        <Suspense fallback={<div>Loading counter...</div>}>
          <ClientSideCounter salawatId={params.id} />
        </Suspense>
      </Box>
    </Box>
  );
}
