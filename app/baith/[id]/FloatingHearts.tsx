import React, { memo } from "react";
import { motion } from "framer-motion";
import { Box, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Box position="absolute" width="100%" height="100%" pointerEvents="none">
      {hearts.map((_, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            fontSize: "16px", // Smaller font size for less distraction
            opacity: 0,
            top: `${Math.random() * 100}%`, // Start at a random vertical position
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, -100],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2,
          }}
        >
          <Icon as={FaHeart} w={4} h={4} color={"red"} />
        </motion.div>
      ))}
    </Box>
  );
};

export default memo(FloatingHearts);
