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
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const bgColor = "green.50"; // Light mode equivalent
  const textColor = "green.800"; // Light mode text color
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
    <Box bg={bgColor} px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link href="/" passHref>
          <Box
            fontWeight="bold"
            fontSize="xl"
            color={textColor}
            cursor="pointer"
          >
            Salawat App
          </Box>
        </Link>
        <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
          <Button
            as={Link}
            href="/"
            variant="ghost"
            mx={2}
            _hover={{ bg: "green.100" }}
          >
            Home
          </Button>
          <Button
            as={Link}
            href="/salawat"
            variant="ghost"
            mx={2}
            _hover={{ bg: "green.100" }}
          >
            Salawat
          </Button>
          <Button
            as={Link}
            href="/leaderboard"
            variant="ghost"
            mx={2}
            _hover={{ bg: "green.100" }}
          >
            Leaderboard
          </Button>
          <Button
            as={Link}
            href="/counter"
            variant="ghost"
            mx={2}
            _hover={{ bg: "green.100" }}
          >
            Counter
          </Button>
          {user && (
            <>
              <Button
                as={Link}
                href="/dashboard"
                variant="ghost"
                mx={2}
                _hover={{ bg: "green.100" }}
              >
                Dashboard
              </Button>
              <Avatar
                name={user.displayName || "User"}
                src={user.photoURL || undefined}
                size="sm"
                mr={4}
                cursor="pointer"
                onClick={() => router.push("/profile")}
              />
              <Button
                onClick={handleLogout}
                colorScheme="red"
                _hover={{ bg: "red.600" }}
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
              _hover={{ bg: "blue.600" }}
            >
              Login
            </Button>
          )}
        </Flex>
        <Button
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          aria-label="Open Menu"
        >
          <HamburgerIcon boxSize={6} color={textColor} />
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} align="start" mt={4}>
              <Button as={Link} href="/" variant="ghost" onClick={onClose}>
                Home
              </Button>
              <Button
                as={Link}
                href="/salawat"
                variant="ghost"
                onClick={onClose}
              >
                Salawat
              </Button>
              <Button
                as={Link}
                href="/leaderboard"
                variant="ghost"
                onClick={onClose}
              >
                Leaderboard
              </Button>
              <Button
                as={Link}
                href="/counter"
                variant="ghost"
                onClick={onClose}
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
                  >
                    Dashboard
                  </Button>
                  <Button
                    as={Link}
                    href="/profile"
                    variant="ghost"
                    onClick={onClose}
                  >
                    <Avatar
                      name={user.displayName || "User"}
                      src={user.photoURL || undefined}
                      size="sm"
                      mr={3}
                      cursor="pointer"
                    />{" "}
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