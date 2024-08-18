import { IconType } from "react-icons";
import { FaStar, FaTrophy } from "react-icons/fa";

interface BadgeConfig {
  name: string;
  icon: IconType;
  color: string;
  description: string;
  check: (data: any) => boolean;
}

export const badgeConfigs: Record<string, BadgeConfig> = {
  "100Salawat": {
    name: "Salawat Pro",
    icon: FaTrophy,
    color: "green.500",
    description: "Awarded for reaching 1000 Salawat recitations.",
    check: (data) => data.totalCount >= 100,
  },
  DailyReciter: {
    name: "Daily Reciter",
    icon: FaStar,
    color: "yellow.500",
    description: "Awarded for maintaining a 7-day streak.",
    check: (data) => Object.keys(data.dailySalawatCounts || {}).length >= 7,
  },
  'streak-master': {
    name: "One Week Streak",
    icon: FaStar,
    color: "yellow.500",
    description: "Awarded for maintaining a 7-day streak.",
    check: (data) => data.currentStreak >= 7,
  },
  // Add more badge configurations here
};
