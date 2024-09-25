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
  Icon,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  FaSignOutAlt,
  FaHome,
  FaStore,
  FaSeedling,
  FaTachometerAlt,
  FaUser,
  FaUserAlt,
  FaChartLine,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";
import TasbeehBeadIcon from "@/public/icons/tasbih.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { checkAuthState } from "@/utils/auth";

export default function Navbar() {
  const bgColor = "green.50"; // Light mode equivalent
  const textColor = "green.800"; // Light mode text color
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

  // Prevent logo click from opening Drawer
  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stops event propagation to other listeners
    router.push("/"); // Navigate to homepage
  };

  const navButtons = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/salawat", label: "Salawat", icon: FaHeart },
    { href: "/store", label: "Store", icon: FaStore },
    { href: "/garden", label: "Salawat Garden", icon: FaSeedling },
    { href: "/leaderboard", label: "Leaderboard", icon: FaChartLine },
    { href: "/contact-us", label: "Contact Us", icon: FaEnvelope },
  ];

  const renderNavButtons = () => (
    <>
      {navButtons.map((button) => (
        <Button
          key={button.href}
          as={Link}
          href={button.href}
          variant="ghost"
          mx={2}
          _hover={{ bg: "green.100" }}
          leftIcon={<button.icon />}
        >
          {button.label}
        </Button>
      ))}
    </>
  );

  const renderAuthButtons = () => {
    if (isLoading) {
      return <Spinner size="sm" />;
    }
    if (user) {
      return (
        <>
          <Button
            as={Link}
            href="/dashboard"
            variant="ghost"
            mx={2}
            _hover={{ bg: "green.100" }}
            leftIcon={<FaTachometerAlt />}
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
      );
    }
    return (
      <Button
        as={Link}
        href="/login"
        colorScheme="blue"
        _hover={{ bg: "blue.600" }}
      >
        Login
      </Button>
    );
  };

  return (
    <Box bg={bgColor} px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box
          fontWeight="bold"
          fontSize="xl"
          color={textColor}
          cursor="pointer"
          onClick={handleLogoClick}
        >
          Salawat App
        </Box>
        <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
          {renderNavButtons()}
          {renderAuthButtons()}
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
              {navButtons.map((button) => (
                <Button
                  key={button.href}
                  as={Link}
                  href={button.href}
                  variant="ghost"
                  onClick={onClose}
                  leftIcon={<button.icon />}
                >
                  {button.label}
                </Button>
              ))}
              {user && !isLoading && (
                <>
                  <Button
                    as={Link}
                    href="/dashboard"
                    variant="ghost"
                    onClick={onClose}
                    leftIcon={<FaTachometerAlt />}
                  >
                    Dashboard
                  </Button>
                  <Button
                    as={Link}
                    href="/profile"
                    variant="ghost"
                    onClick={onClose}
                    leftIcon={<FaUser />}
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
              {!user && !isLoading && (
                <Button
                  as={Link}
                  href="/login"
                  colorScheme="blue"
                  onClick={onClose}
                >
                  Login
                </Button>
              )}
              {isLoading && <Spinner />}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
