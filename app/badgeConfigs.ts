import { IconType } from "react-icons";
import {
  FaCalendarCheck,
  FaFire,
  FaLeaf,
  FaMedal,
  FaStar,
  FaTrophy,
} from "react-icons/fa";

interface BadgeConfig {
  name: string;
  icon: IconType;
  color: string;
  description: string;
  check: (data: any) => boolean;
}

export const badgeConfigs: Record<string, BadgeConfig> = {
  "beginner-salawat": {
    name: "Beginner Salawat",
    icon: FaLeaf,
    color: "teal.500",
    description: "Awarded for making your first Salawat recitation.",
    check: (data) => data.totalCount >= 1,
  },
  "weekly-reciter": {
    name: "Weekly Reciter",
    icon: FaCalendarCheck,
    color: "blue.500",
    description: "Awarded for reciting Salawat every day for a week.",
    check: (data) => {
      const today = new Date().toISOString().split("T")[0];
      const last7Days = Object.keys(data.dailySalawatCounts || {}).slice(-7);
      return last7Days.every((day) => data.dailySalawatCounts[day] > 0);
    },
  },
  "100Salawat": {
    name: "Salawat Enthusiast",
    icon: FaTrophy,
    color: "green.500",
    description: "Awarded for reaching 100 Salawat recitations.",
    check: (data) => data.totalCount >= 100,
  },
  "daily-reciter": {
    name: "Daily Reciter",
    icon: FaStar,
    color: "yellow.500",
    description: "Awarded for maintaining a 7-day daily recitation streak.",
    check: (data) => Object.keys(data.dailySalawatCounts || {}).length >= 7,
  },
  "one-week-streak": {
    name: "One Week Streak",
    icon: FaFire,
    color: "orange.500",
    description:
      "Awarded for maintaining a 7-day streak in Salawat recitations.",
    check: (data) => data.currentStreak >= 7,
  },
  "monthly-master": {
    name: "Monthly Master",
    icon: FaMedal,
    color: "purple.500",
    description:
      "Awarded for maintaining a daily recitation streak for an entire month.",
    check: (data) => {
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate();
      return Object.keys(data.dailySalawatCounts || {}).length >= daysInMonth;
    },
  },
  "streak-legend": {
    name: "Streak Legend",
    icon: FaStar,
    color: "red.500",
    description: "Awarded for achieving the longest recitation streak.",
    check: (data) => data.highestStreak >= 30, // Example: Longest streak of 30 days
  },
  "recitation-hero": {
    name: "Recitation Hero",
    icon: FaTrophy,
    color: "blue.700",
    description: "Awarded for exceeding 1000 Salawat recitations.",
    check: (data) => data.totalCount >= 1000,
  },
  "legendary-reciter": {
    name: "Legendary Reciter",
    icon: FaTrophy,
    color: "gold.600",
    description: "Awarded for surpassing 5000 Salawat recitations.",
    check: (data) => data.totalCount >= 5000,
  },
  // Add more badge configurations here as needed
};
