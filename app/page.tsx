"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface SalawatData {
  id: string;
  title: string;
}

export default function HomePage() {
  const [salawatList, setSalawatList] = useState<SalawatData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cardSize = useBreakpointValue({ base: "full", sm: "md", md: "lg" });

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

  const handleCardClick = (id: string) => {
    router.push(`/salawat/${id}`);
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="2xl" mb={8} textAlign="center" color="teal.400">
        Salawat List
      </Heading>
      {loading ? (
        <Text textAlign="center">Loading...</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {salawatList.map((salawat) => (
            <Card
              key={salawat.id}
              borderWidth={1}
              borderRadius="md"
              overflow="hidden"
              boxShadow="lg"
              cursor="pointer"
              _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
              transition="all 0.3s ease"
              onClick={() => handleCardClick(salawat.id)}
            >
              <CardBody
                p={5}
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Heading as="h3" size="lg" color="teal.600">
                  {salawat.title}
                </Heading>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
