// app/salawat/[id]/page.tsx

import { Suspense } from 'react';
import { Box, Heading, Text, Divider } from "@chakra-ui/react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ClientSideCounter from './ClientSideCounter';

interface SalawatWord {
  word: string;
  translations?: { [key: string]: string };
  translation?: string;
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

async function getSalawatData(id: string): Promise<SalawatData> {
  const salawatRef = doc(db, "salawat", id);
  const salawatSnap = await getDoc(salawatRef);

  if (!salawatSnap.exists()) {
    throw new Error("Salawat not found");
  }

  return salawatSnap.data() as SalawatData;
}

export default async function SalawatPage({ params }: { params: { id: string } }) {
  const salawat = await getSalawatData(params.id);

  const renderArabicTextWithTooltips = (
    arabicText: string,
    words: SalawatWord[]
  ) => {
    return arabicText.split(" ").map((word, index) => (
      <Text
        key={index}
        as="span"
        mx={1}
        display="inline"
        fontFamily="'Amiri', serif"
        fontSize="2xl"
        cursor="pointer"
        _hover={{ color: "teal.500" }}
        transition="color 0.3s ease"
        title={words.find(w => w.word === word)?.translations?.['en'] || ''}
      >
        {word}
      </Text>
    ));
  };

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="https://cdn.pixabay.com/video/2024/01/26/198164-906869460_large.mp4"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        background="rgba(0, 0, 0, 0.5)"
        zIndex={0}
      />

      {/* Content */}
      <Box
        position="relative"
        zIndex={1}
        p={5}
        height="calc(100vh - 100px)"
        overflowY="auto"
        pb="100px"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="white">
          {salawat.title}
        </Heading>
        {salawat.lines.map((line, index) => (
          <Box key={index} mb={6}>
            <Text
              mb={4}
              fontFamily="'Amiri', serif"
              fontSize="lg"
              textAlign="center"
              color="white"
            >
              {renderArabicTextWithTooltips(line.arabic, line.words)}
            </Text>
            <Text mb={4} fontSize="md" color="gray.200" textAlign="center">
              {line.translations['en']}
            </Text>
            {index < salawat.lines.length - 1 && (
              <Divider my={4} borderColor="gray.200" />
            )}
          </Box>
        ))}

        <Suspense fallback={<div>Loading counter...</div>}>
          <ClientSideCounter />
        </Suspense>
      </Box>
    </Box>
  );
}