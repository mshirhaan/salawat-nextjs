"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Flex,
  Button,
  Avatar,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Box bg="green.500" color="white" px={4} py={2} boxShadow="lg">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Link href="/" passHref>
            <Button
              variant="ghost"
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              _hover={{ bg: "green.700" }}
              _active={{ bg: "green.800" }}
            >
              Salawat App
            </Button>
          </Link>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href="/" passHref>
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: "green.700" }}
              >
                Home
              </Button>
            </Link>
            <Link href="/salawat" passHref>
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: "green.700" }}
              >
                Salawat
              </Button>
            </Link>
            <Link href="/leaderboard" passHref>
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: "green.700" }}
              >
                Leaderboard
              </Button>
            </Link>
            <Link href="/counter" passHref>
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: "green.700" }}
              >
                Counter
              </Button>
            </Link>
          </HStack>
        </HStack>
        <Flex alignItems="center">
          {user ? (
            <HStack spacing={4}>
              <Avatar
                name={user.displayName || "User"}
                src={user.photoURL || undefined}
                size="sm"
                cursor="pointer"
                onClick={() => router.push("/profile")}
              />
              <Link href="/dashboard" passHref>
                <Button
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "green.700" }}
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                colorScheme="red"
                variant="solid"
                size="sm"
                leftIcon={<FaSignOutAlt />}
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <Link href="/login" passHref>
              <Button colorScheme="blue" variant="solid">
                Login
              </Button>
            </Link>
          )}
          <IconButton
            icon={<HamburgerIcon />}
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            aria-label="Open Menu"
            color="white"
            variant="ghost"
            _hover={{ bg: "green.700" }}
            _active={{ bg: "green.800" }}
            ml={2}
          />
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} align="start" mt={4} color="white">
              <Button
                as={Link}
                href="/"
                variant="ghost"
                onClick={onClose}
                justifyContent="flex-start"
                color="green"
                _hover={{ bg: "green.500", color: "white" }}
              >
                Home
              </Button>
              <Button
                as={Link}
                href="/salawat"
                variant="ghost"
                onClick={onClose}
                justifyContent="flex-start"
                color="green"
                _hover={{ bg: "green.500", color: "white" }}
              >
                Salawat
              </Button>
              <Button
                as={Link}
                href="/leaderboard"
                variant="ghost"
                onClick={onClose}
                justifyContent="flex-start"
                color="green"
                _hover={{ bg: "green.500", color: "white" }}
              >
                Leaderboard
              </Button>
              <Button
                as={Link}
                href="/counter"
                variant="ghost"
                onClick={onClose}
                justifyContent="flex-start"
                color="green"
                _hover={{ bg: "green.500", color: "white" }}
              >
                Counter
              </Button>
              {user && (
                <>
                  <Button
                    as={Link}
                    href="/dashboard"
                    variant="ghost"
                    onClick={onClose}
                    justifyContent="flex-start"
                    color="green"
                    _hover={{ bg: "green.500", color: "white" }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    as={Link}
                    href="/profile"
                    variant="ghost"
                    onClick={onClose}
                    justifyContent="flex-start"
                    color="green"
                    _hover={{ bg: "green.500", color: "white" }}
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    colorScheme="red"
                    mt={4}
                    leftIcon={<FaSignOutAlt />}
                  >
                    Logout
                  </Button>
                </>
              )}
              {!user && (
                <Button
                  as={Link}
                  href="/login"
                  colorScheme="blue"
                  onClick={onClose}
                >
                  Login
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
