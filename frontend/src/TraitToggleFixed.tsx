import React from "react";

const nameToTraitMap: Record<string, string> = {
  "Fire Rift": "fire",
  "Plant Rift": "plant",
  "Earth Rift": "earth",
  "Cold Rift": "cold",
  "Lightning Rift": "lightning",
};

const TraitToggleFixed: React.FC<{ trait: string, name: string }> = ({ trait, name }) => {
  const mappedTrait = nameToTraitMap[name];
  const isOn = mappedTrait === trait;

  return (
    <img
      src={`/images/traits/${trait}-${isOn ? 'on' : 'off'}.png`}
      alt={trait}
      style={{ filter: isOn ? 'brightness(1)' : 'brightness(0.2)' }}
    />
  );
};

export default TraitToggleFixed;