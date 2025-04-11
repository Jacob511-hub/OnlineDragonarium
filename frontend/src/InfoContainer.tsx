import React from "react";
import useDragons from "./hooks/useDragons";
import DragonDisplay from "./DragonDisplay";
import DragonCount from "./DragonCount";
import Traits from "./Traits";
import TraitsFixed from "./TraitsFixed";
import Fire from './images/Fire.webp';
import useDragonImage from "./hooks/useDragonImage";

const InfoContainer: React.FC<{ selectedDragonId: number | null }> = ({ selectedDragonId }) => {
  const { dragons, error } = useDragons();

  const dragon = selectedDragonId !== null
    ? dragons.find((d) => d.id === selectedDragonId)
    : dragons.find((d) => d.name === "Fire");

  const displayDragon = dragon ?? {
    id: 1,
    name: "Fire",
    elements: ["Fire"],
    can_be_traited: false,
    is_only_traited: false
  };

  const dragonImage = useDragonImage(displayDragon.name);

  if (error) return <div>{error}</div>;
  if (!dragons.length) return <div>Loading dragons</div>;

  return (
    <div className="container">
      <DragonDisplay src={dragonImage || Fire} elements={displayDragon.elements} />
      <h1 style={{margin: 0}}>{displayDragon.name}</h1>
      <Traits can_be_traited={displayDragon.can_be_traited} dragon_id={displayDragon.id}/>
      <TraitsFixed is_only_traited={displayDragon.is_only_traited} name={displayDragon.name}/>
      <DragonCount dragon_id={displayDragon.id} can_be_traited={displayDragon.can_be_traited} is_only_traited={displayDragon.is_only_traited}/>
    </div>
  );
};

export default InfoContainer;
