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
  useColorMode,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  FaSignOutAlt,
  FaHome,
  FaStore,
  FaSeedling,
  FaTachometerAlt,
  FaUser,
  FaChartLine,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { checkAuthState } from "@/utils/auth";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const { user, logout } = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthState();
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navItems = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/salawat", label: "Salawat", icon: FaHeart },
    { href: "/store", label: "Store", icon: FaStore },
    { href: "/garden", label: "Garden", icon: FaSeedling },
    { href: "/leaderboard", label: "Leaderboard", icon: FaChartLine },
    { href: "/contact-us", label: "Contact", icon: FaEnvelope },
  ];

  return (
    <Box bg={bgColor} boxShadow="sm" position="sticky" top="0" zIndex="sticky">
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Text
              fontWeight="bold"
              fontSize="xl"
              color={textColor}
              cursor="pointer"
              onClick={() => router.push("/")}
            >
              Salawat App
            </Text>
          </Flex>

          <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                as={Link}
                href={item.href}
                variant="ghost"
                leftIcon={<item.icon />}
                mx={1}
              >
                {item.label}
              </Button>
            ))}
          </Flex>

          <Flex alignItems="center">
            <IconButton
              aria-label="Toggle Theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              size="sm"
              mr={2}
            />

            {!isLoading && user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                >
                  <Avatar
                    name={user.displayName || "User"}
                    src={user.photoURL || undefined}
                    size="sm"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FaUser />} as={Link} href="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem
                    icon={<FaTachometerAlt />}
                    as={Link}
                    href="/dashboard"
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : !isLoading ? (
              <Button as={Link} href="/login" colorScheme="blue" size="sm">
                Login
              </Button>
            ) : null}

            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              icon={<HamburgerIcon />}
              aria-label="Open Menu"
              ml={2}
            />
          </Flex>
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={8}>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  as={Link}
                  href={item.href}
                  leftIcon={<item.icon />}
                  justifyContent="flex-start"
                  variant="ghost"
                  w="full"
                  onClick={onClose}
                >
                  {item.label}
                </Button>
              ))}
              {user && !isLoading && (
                <>
                  <Button
                    as={Link}
                    href="/profile"
                    leftIcon={<FaUser />}
                    justifyContent="flex-start"
                    variant="ghost"
                    w="full"
                    onClick={onClose}
                  >
                    Profile
                  </Button>
                  <Button
                    as={Link}
                    href="/dashboard"
                    leftIcon={<FaTachometerAlt />}
                    justifyContent="flex-start"
                    variant="ghost"
                    w="full"
                    onClick={onClose}
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    leftIcon={<FaSignOutAlt />}
                    justifyContent="flex-start"
                    colorScheme="red"
                    variant="ghost"
                    w="full"
                  >
                    Logout
                  </Button>
                </>
              )}
              {!user && !isLoading && (
                <Button
                  as={Link}
                  href="/login"
                  colorScheme="blue"
                  onClick={onClose}
                  w="full"
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
