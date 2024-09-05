"use client";

import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";

const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (!user.emailVerified) {
      router.push("/verify-email");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to send a message.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        userId: user.uid,
        email: user.email,
        subject,
        message,
        timestamp: new Date(),
      });

      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSubject("");
      setMessage("");
      router.push("/");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description:
          "There was an error sending your message. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading mb={6} textAlign="center">
        Contact Us
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="subject" mb={4} isRequired>
          <FormLabel>Subject</FormLabel>
          <Input
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </FormControl>

        <FormControl id="message" mb={6} isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            size="md"
          />
        </FormControl>

        <Button
          colorScheme="teal"
          isLoading={loading}
          type="submit"
          width="100%"
          size="lg"
        >
          Send Message
        </Button>
      </form>
    </Box>
  );
};

export default ContactUs;
