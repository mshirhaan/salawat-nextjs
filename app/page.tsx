"use client";

import { useState, useEffect } from "react";
import { Box, Heading, SimpleGrid, Card, CardBody, Text, useBreakpointValue, useTheme, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

interface SalawatData {
  id: string;
  title: string;
}

export default function HomePage() {
  const [salawatList, setSalawatList] = useState<SalawatData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { colors } = useTheme();
  const cardSize = useBreakpointValue({ base: 'full', sm: 'md', md: 'lg' });

  useEffect(() => {
    async function fetchSalawatList() {
      try {
        const response = await fetch('/api/salawat');
        const data = await response.json();
        setSalawatList(data);
      } catch (error) {
        console.error('Error fetching Salawat list:', error);
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
    <Box p={5} bg="gray.50" minHeight="100vh">
      <Heading as="h1" size="2xl" mb={8} textAlign="center" color="teal.400">
        Salawat List
      </Heading>
      {loading ? (
        <Text textAlign="center">Loading...</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {salawatList.map(salawat => (
            <Card
              key={salawat.id}
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              cursor="pointer"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '2xl',
                bg: colors.teal[50],
                transition: 'all 0.3s ease'
              }}
              transition="all 0.3s ease"
              onClick={() => handleCardClick(salawat.id)}
            >
              <CardBody
                p={6}
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                bg="white"
                borderBottomWidth={1}
                borderColor="teal.200"
              >
                <Stack spacing={4}>
                  <Heading as="h3" size="lg" color="teal.600" fontWeight="bold">
                    {salawat.title}
                  </Heading>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
