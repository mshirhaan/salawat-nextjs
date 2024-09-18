// components/Plant.tsx
import Image from "next/image";
import styles from "./GardenGrid.module.css";

type PlantProps = {
  plantId: string;
};

export function Plant({ plantId }: PlantProps) {
  // Function to get the correct file path for the SVG
  const getPlantIconPath = (id: string): string => {
    // Assuming SVG files are named exactly as the plantId
    return `/icons/${id}.svg`;
  };

  return (
    <div className={styles["garden-plant"]}>
      <Image
        src={getPlantIconPath(plantId)}
        alt={`${plantId} plant`}
        width={50} // Adjust size as needed
        height={50} // Adjust size as needed
      />
    </div>
  );
}
