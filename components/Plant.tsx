// components/Plant.tsx
import styles from "./GardenGrid.module.css";
type PlantProps = {
  plantId: string;
};

export function Plant({ plantId }: PlantProps) {
  // Map plant IDs to emojis
  const plantEmojis: { [key: string]: string } = {
    rose: "🌹",
    tree: "🌳",
    sunflower: "🌻",
    tulip: "🌷",
    cactus: "🌵",
    // Add more plants as needed
  };

  // Get the emoji based on plantId, fallback to default emoji
  const plantEmoji = plantEmojis[plantId] || "🌱"; // Default to seedling emoji if plantId not found

  return <div className={styles["garden-plant"]}>{plantEmoji}</div>;
}
