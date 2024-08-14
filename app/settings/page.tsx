// app/settings/page.tsx
"use client";

import { Box, Heading, Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

export default function Settings() {
  const [showCounter, setShowCounter] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={5}>
        Settings
      </Heading>
      <FormControl display="flex" alignItems="center" mb={5}>
        <FormLabel htmlFor="counter-toggle" mb="0">
          Show Counter
        </FormLabel>
        <Switch
          id="counter-toggle"
          isChecked={showCounter}
          onChange={() => setShowCounter(!showCounter)}
        />
      </FormControl>
      <FormControl display="flex" alignItems="center" mb={5}>
        <FormLabel htmlFor="translation-toggle" mb="0">
          Show Translation
        </FormLabel>
        <Switch
          id="translation-toggle"
          isChecked={showTranslation}
          onChange={() => setShowTranslation(!showTranslation)}
        />
      </FormControl>
    </Box>
  );
}
