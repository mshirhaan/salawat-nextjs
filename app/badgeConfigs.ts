import { IconType } from 'react-icons';
import { FaStar, FaTrophy, FaMedal } from 'react-icons/fa';

export type BadgeConfig = {
  name: string;
  icon: IconType;
  color: string;
  description: string;
};

export const badgeConfigs: Record<string, BadgeConfig> = {
  "streak-master": {
    name: "Streak Master",
    icon: FaStar,
    color: "yellow.500",
    description: "Awarded for maintaining a 7-day streak.",
  },
  "salawat-pro": {
    name: "Salawat Pro",
    icon: FaTrophy,
    color: "green.500",
    description: "Awarded for reaching 1000 Salawat recitations.",
  },
  // Add more badge configurations here
};
