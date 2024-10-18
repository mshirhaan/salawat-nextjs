import React, { memo } from "react";
import { motion } from "framer-motion";
import { Box, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Box position="relative" width="100%" height="100%">
      {hearts.map((_, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            fontSize: "24px",
            opacity: 0,
            top: "50%",
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, -100],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
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
