"use client";

import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  List,
  ListItem,
  Flex,
  VStack,
  HStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { GroupLeaderboard } from "@/components/GroupLeaderboard";

const GroupsPage: React.FC = () => {
  const { user } = useAuth();
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState<string[]>([]);
  const [allGroups, setAllGroups] = useState<string[]>([]);
  const toast = useToast(); // Chakra UI toast for notifications

  useEffect(() => {
    if (!user) return;

    async function fetchUserGroups() {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userGroups = userDoc.data()?.groups || [];
      setGroups(userGroups);
    }

    async function fetchAllGroups() {
      const groupsSnapshot = await getDocs(collection(db, "groups"));
      const groupsList = groupsSnapshot.docs.map((doc) => doc.id);
      setAllGroups(groupsList);
    }

    fetchUserGroups();
    fetchAllGroups();
  }, [user]);

  const handleCreateGroup = async () => {
    if (!user || groupName.trim() === "") return;

    const groupRef = doc(db, "groups", groupName);
    await setDoc(groupRef, {
      groupName,
      members: [user.uid],
      totalSalawatCount: 0,
      leaderboard: {},
    });

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      groups: arrayUnion(groupRef.id),
    });

    setGroups([...groups, groupName]);
    setGroupName("");

    toast({
      title: "Group created.",
      description: `You've successfully created the group ${groupName}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleJoinGroup = async (groupId: string) => {
    if (!user) return;

    const groupRef = doc(db, "groups", groupId);

    await updateDoc(groupRef, {
      members: arrayUnion(user.uid),
    });

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      groups: arrayUnion(groupId),
    });

    setGroups([...groups, groupId]);

    toast({
      title: "Joined group.",
      description: `You've successfully joined the group ${groupId}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Your Groups
        </Heading>
        <Box width="100%">
          {groups.length > 0 ? (
            <List spacing={3}>
              {groups.map((groupId) => (
                <ListItem key={groupId} p={4} bg="green.100" borderRadius="md">
                  {groupId}
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>You are not part of any groups.</Text>
          )}
        </Box>

        <Divider />

        <Heading as="h2" size="lg">
          Create a Group
        </Heading>
        <Flex width="100%" gap={2}>
          <Input
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleCreateGroup}>
            Create
          </Button>
        </Flex>

        <Divider />

        <Heading as="h2" size="lg">
          Join a Group
        </Heading>
        <Flex wrap="wrap" gap={4}>
          {allGroups.map((groupId) => (
            <Button
              key={groupId}
              colorScheme="green"
              onClick={() => handleJoinGroup(groupId)}
            >
              Join {groupId}
            </Button>
          ))}
        </Flex>

        <Divider />

        <Heading as="h2" size="lg">
          Group Leaderboards
        </Heading>
        <Box width="100%">
          <GroupLeaderboard userId={user.uid} />
        </Box>
      </VStack>
    </Box>
  );
};

export default GroupsPage;
