import React, { useEffect, useState } from "react";
import DragonDisplay from "./DragonDisplay";
import Fire from './images/Fire.webp';
import Plant from './images/Plant.webp';
import Lightning from './images/Lightning.webp';
import Earth from './images/Earth.webp';
import Air from './images/Air.webp';
import Metal from './images/Metal.webp';
import Cold from './images/Cold.webp';
import Water from './images/Water.webp';
import Light from './images/Light.webp';
import Dark from './images/Dark.webp';
import Poison from './images/Poison.webp';
interface DragonData {
  id: number;
  name: string;
  elements: string[];
}

const imageMap: { [key: string]: string } = {
    Fire: Fire,
    Plant: Plant,
    Lightning: Lightning,
    Earth: Earth,
    Air: Air,
    Metal: Metal,
    Cold: Cold,
    Water: Water,
    Light: Light,
    Dark: Dark,
    Poison: Poison,
};

const InfoContainer: React.FC<{ selectedDragonId: number | null }> = ({ selectedDragonId }) => {
  const [dragon, setDragon] = useState<DragonData | null>(null);

  useEffect(() => {
    const fetchDragon = async () => {
      try {
        const response = await fetch("http://localhost:5000/dragons");
        const data: DragonData[] = await response.json();

        // If selectedDragonId is null, use Fire Dragon as the default
        if (selectedDragonId !== null) {
          const foundDragon = data.find((d) => d.id === selectedDragonId);
          setDragon(foundDragon || null);
        } else {
          const fireDragon = data.find((d) => d.name === "Fire");
          setDragon(fireDragon || null); // Set Fire Dragon by default
        }
      } catch (err) {
        console.error("Failed to fetch dragon data", err);
        setDragon(null);
      }
    };

    fetchDragon();
  }, [selectedDragonId]);

  // Always display a dragon's information, defaulting to Fire dragon if null
  const displayDragon = dragon ?? { name: "Fire", elements: ["Fire"] };

  return (
    <div className="container">
      <DragonDisplay src={imageMap[displayDragon.name] || imageMap['Fire']} elements={displayDragon.elements} />
    </div>
  );
};

export default InfoContainer;
