import React from "react";
import { useCurrentUser } from "./CurrentUserContext";
import useTraitState from "./hooks/useTraitState";

interface TraitToggleProps {
  trait: string;
  dragon_id: number;
  traits: Array<{ name: string; id: number }>;
}

const TraitToggle: React.FC<TraitToggleProps> = ({ trait, dragon_id, traits }) => {
  const { user_id } = useCurrentUser();
  const userIdString = user_id !== null ? user_id.toString() : "guest";

  const traitData = traits.find(t => t.name.toLowerCase() === trait.toLowerCase());  
  const trait_id = traitData ? traitData.id : null;

  const { isOn, error: apiError, toggleTraitState } = useTraitState({
    user_id: userIdString,
    dragon_id,
    trait_id,
  });

  if (apiError) return <div>Error: {apiError}</div>;
  if (trait_id === null) return null;

  return (
    <img
      src={`./images/traits/${trait}-${isOn ? 'on' : 'off'}.png`}
      alt={trait}
      onClick={toggleTraitState}
      style={{ cursor: 'pointer', transition: 'filter 0.3s', filter: isOn ? 'brightness(1)' : 'brightness(0.5)' }}
    />
  );
};

export default TraitToggle;
