import React from "react";
import useTraits from './hooks/useTraits';
import useCurrentUser from "./hooks/useCurrentUser";
import useTraitState from "./hooks/useTraitState";

const TraitToggle: React.FC<{ trait: string, dragon_id: number }> = ({ trait, dragon_id }) => {
  const user_id = useCurrentUser();
  const userIdString = user_id !== null ? user_id.toString() : "guest";
  const { traits, error } = useTraits();

  const traitData = traits.find(t => t.name.toLowerCase() === trait.toLowerCase());  
  const trait_id = traitData ? traitData.id : null;

  const { isOn, error: apiError, toggleTraitState } = useTraitState({
    user_id: userIdString,
    dragon_id,
    trait_id,
  });

  if (error || apiError) return <div>Error: {error || apiError}</div>;
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
