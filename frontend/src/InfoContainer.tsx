import React from "react";
import useDragons from "./hooks/useDragons";
import DragonDisplay from "./DragonDisplay";
import DragonCount from "./DragonCount";
import Traits from "./Traits";
import { imageMap } from "./imageMap";

const InfoContainer: React.FC<{ selectedDragonId: number | null }> = ({ selectedDragonId }) => {
  const { dragons, error } = useDragons();

  if (error) return <div>{error}</div>;
  if (!dragons.length) return <div>Loading dragons</div>;

  const dragon = selectedDragonId !== null
    ? dragons.find((d) => d.id === selectedDragonId)
    : dragons.find((d) => d.name === "Fire");

  const displayDragon = dragon ?? { id: 1, name: "Fire", elements: ["Fire"], can_be_traited: false };

  return (
    <div className="container">
      <DragonDisplay src={imageMap[displayDragon.name] || imageMap['Fire']} elements={displayDragon.elements} />
      <h1 style={{margin: 0}}>{displayDragon.name}</h1>
      <Traits can_be_traited={displayDragon.can_be_traited} dragon_id={displayDragon.id}/>
      <DragonCount dragon_id={displayDragon.id} can_be_traited={displayDragon.can_be_traited}/>
    </div>
  );
};

export default InfoContainer;
