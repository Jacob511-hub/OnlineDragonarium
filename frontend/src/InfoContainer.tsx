import React from "react";
import useDragons from "./hooks/useDragons";
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
  const { dragons, error } = useDragons();

  if (error) return <div>{error}</div>;
  if (!dragons.length) return <div>Loading dragons</div>;

  const dragon = selectedDragonId !== null
    ? dragons.find((d) => d.id === selectedDragonId)
    : dragons.find((d) => d.name === "Fire");

  const displayDragon = dragon ?? { name: "Fire", elements: ["Fire"] };

  return (
    <div className="container">
      <DragonDisplay src={imageMap[displayDragon.name] || imageMap['Fire']} elements={displayDragon.elements} />
    </div>
  );
};

export default InfoContainer;
