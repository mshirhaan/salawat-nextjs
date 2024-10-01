// components/Store.tsx
import { useEffect, useState, useCallback } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import {
  Button,
  VStack,
  Text,
  Box,
  Grid,
  Stack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { buyLand } from "@/lib/garden";
import { GiTwoCoins } from "react-icons/gi";

export default function Store({ userId }: { userId: string }) {
  const [storePoints, setStorePoints] = useState<number>(0);
  const [userPlants, setUserPlants] = useState<
    Array<{ plantId: string; name: string; quantity: number }>
  >([]);

  // Theme colors
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const buttonColorScheme = useColorModeValue("teal", "teal");

  const plantsForSale = [
    { plantId: "rose", name: "Rose", price: 1000 },
    { plantId: "tulip", name: "Tulip", price: 800 },
    { plantId: "sunflower", name: "Sunflower", price: 1200 },
    { plantId: "hibiscus", name: "Hibiscus", price: 1500 },
    { plantId: "orchid", name: "Orchid", price: 1200 },
    { plantId: "lily", name: "Lily", price: 900 },
    { plantId: "cactus", name: "Cactus", price: 600 },
    { plantId: "daisy", name: "Daisy", price: 700 },
    { plantId: "lavender", name: "Lavender", price: 950 },
    { plantId: "bamboo", name: "Bamboo", price: 700 },
    { plantId: "bonsai", name: "Bonsai Tree", price: 1500 },
    { plantId: "aloe", name: "Aloe Vera", price: 350 },

    { plantId: "maple", name: "Maple Tree", price: 2000 },
    { plantId: "palm", name: "Palm Tree", price: 1800 },
    { plantId: "pine", name: "Pine Tree", price: 1600 },
    { plantId: "succulent", name: "Succulent", price: 1300 },
    { plantId: "jasmine", name: "Jasmine", price: 850 },
    { plantId: "cherry-blossom", name: "Cherry Blossom", price: 1700 },
    { plantId: "oak", name: "Oak Tree", price: 1000 },
  ];

  const landPrice = 10000;

  const toast = useToast();

  const loadStoreData = useCallback(async () => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setStorePoints(userData?.storePoints || 0);
      setUserPlants(userData?.myPlants || []);
    }
  }, [userId]);

  const handleBuyPlant = async (plantId: string, price: number) => {
    if (storePoints >= price) {
      const updatedPlants = userPlants.map((plant) =>
        plant.plantId === plantId
          ? { ...plant, quantity: plant.quantity + 1 }
          : plant
      );

      if (!updatedPlants.some((plant) => plant.plantId === plantId)) {
        const plantData = plantsForSale.find(
          (plant) => plant.plantId === plantId
        );
        updatedPlants.push({
          plantId,
          name: plantData!.name,
          quantity: 1,
        });
      }

      await updateDoc(doc(db, "users", userId), {
        storePoints: storePoints - price,
        myPlants: updatedPlants,
      });

      await loadStoreData();

      toast({
        title: "Plant Purchased!",
        description: `You bought a ${
          plantsForSale.find((p) => p.plantId === plantId)?.name
        }.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points to buy this plant.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBuyLand = async () => {
    if (storePoints >= landPrice) {
      await buyLand(userId); // Use the updated buyLand function
      await loadStoreData();

      toast({
        title: "Land Purchased!",
        description: "You bought additional land for your garden.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points to buy land.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    loadStoreData();
  }, [loadStoreData]);

  return (
    <VStack spacing={8} p={6} bg={bgColor} borderRadius="lg" boxShadow="lg">
      <Stack spacing={4} align="center">
        <Text fontSize="3xl" fontWeight="bold" color={headingColor}>
          Store
        </Text>
        <Text
          fontSize="3xl"
          color={textColor}
          display="flex"
          alignItems="center"
        >
          Your Points: &nbsp;
          <GiTwoCoins color="gold" style={{ marginRight: "8px" }} />
          <strong>{storePoints}</strong>
        </Text>
        <Text color={mutedTextColor} alignItems="center">
          1 salawat recitation earns you 1 point
        </Text>
      </Stack>

      <Grid
        templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
        gap={6}
        w="full"
      >
        {plantsForSale.map((plant) => (
          <Box
            key={plant.plantId}
            p={4}
            bg={cardBgColor}
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box width={50} height={50} position="relative" mb={2}>
              <Image
                src={`/icons/${plant.plantId}.svg`}
                alt={plant.name}
                layout="fill"
                objectFit="contain"
              />
            </Box>
            <Text fontSize="xl" fontWeight="semibold" mb={1} color={textColor}>
              {plant.name}
            </Text>
            <Text color={mutedTextColor} mb={2}>
              Price: {plant.price} points
            </Text>
            <Button
              colorScheme={buttonColorScheme}
              onClick={() => handleBuyPlant(plant.plantId, plant.price)}
            >
              Buy
            </Button>
          </Box>
        ))}

        <Box
          p={4}
          bg={cardBgColor}
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box width={50} height={50} position="relative" mb={2}>
            <Image
              src="/icons/land.svg"
              alt="Land"
              layout="fill"
              objectFit="contain"
            />
          </Box>
          <Text fontSize="xl" fontWeight="semibold" mb={1} color={textColor}>
            Land
          </Text>
          <Text color={mutedTextColor} mb={2}>
            Price: {landPrice} points
          </Text>
          <Button colorScheme="blue" onClick={handleBuyLand}>
            Buy Land
          </Button>
        </Box>
      </Grid>

      <Box w="full">
        <Text fontSize="lg" mb={2} color={textColor}>
          Your Plants
        </Text>
        <Grid
          templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
          gap={6}
          w="full"
        >
          {userPlants.length > 0 ? (
            userPlants.map((plant) => (
              <Box
                key={plant.plantId}
                p={4}
                bg={cardBgColor}
                borderRadius="md"
                boxShadow="md"
                textAlign="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box width={50} height={50} position="relative" mb={2}>
                  <Image
                    src={`/icons/${plant.plantId}.svg`}
                    alt={plant.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                  mb={1}
                  color={textColor}
                >
                  {plant.name}
                </Text>
                <Text color={mutedTextColor}>Quantity: {plant.quantity}</Text>
              </Box>
            ))
          ) : (
            <Text textAlign="center" color={mutedTextColor}>
              You don&apos;t have any plants yet.
            </Text>
          )}
        </Grid>
      </Box>
    </VStack>
  );
}
