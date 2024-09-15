// components/Plant.tsx
import styles from "./GardenGrid.module.css";
type PlantProps = {
  plantId: string;
};

export function Plant({ plantId }: PlantProps) {
  // Map plant IDs to emojis
  const plantEmojis: { [key: string]: string } = {
    rose: "🌹",
    tulip: "🌷",
    sunflower: "🌻",
    hibiscus: "🌺",
    orchid: "🪷",
    lily: "🌸",
    cactus: "🌵",
    daisy: "🌼",
    lavender: "💐",
    bamboo: "🎋",
    bonsai: "🌳",
    aloe: "🌿",
    // Add more plants as needed
  };

  const plantsForSale = [
    { plantId: "rose", name: "Rose", emoji: "🌹", price: 1000 }, // Price is high for slow progression
    { plantId: "tulip", name: "Tulip", emoji: "🌷", price: 800 },
    { plantId: "sunflower", name: "Sunflower", emoji: "🌻", price: 1200 },
    { plantId: "hibiscus", name: "Hibiscus", emoji: "🌺", price: 1500 },
    { plantId: "orchid", name: "Orchid", emoji: "🪷", price: 1200 },
    { plantId: "lily", name: "Lily", emoji: "🌸", price: 900 },
    { plantId: "cactus", name: "Cactus", emoji: "🌵", price: 600 },
    { plantId: "daisy", name: "Daisy", emoji: "🌼", price: 700 },
    { plantId: "lavender", name: "Lavender", emoji: "💐", price: 950 },
    { plantId: "bamboo", name: "Bamboo", emoji: "🎋", price: 700 },
    { plantId: "bonsai", name: "Bonsai Tree", emoji: "🌳", price: 1500 },
    { plantId: "aloe", name: "Aloe Vera", emoji: "🌿", price: 350 },
  ];

  // Get the emoji based on plantId, fallback to default emoji
  const plantEmoji = plantEmojis[plantId] || "🌱"; // Default to seedling emoji if plantId not found

  return <div className={styles["garden-plant"]}>{plantEmoji}</div>;
}
