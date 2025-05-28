import React from "react";
import TraitToggle from "./TraitToggle";
import { useCurrentUser } from "./CurrentUserContext";
import useTraits from "./hooks/useTraits";
import useDragonTraits from "./hooks/useDragonTraits";

const Traits: React.FC<{ can_be_traited: boolean, dragon_id: number }> = ({ can_be_traited, dragon_id }) => {
    const { traits, error: traitError } = useTraits();
    const { user_id } = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";
  
    const { loading, error: dragonTraitError } = useDragonTraits(userIdString, dragon_id);

    if (!can_be_traited) return null;
    if (traitError || dragonTraitError) return <div>Error: {traitError || dragonTraitError}</div>;
    if (!traits || loading) return <div>Loading traits...</div>;

    const traitList = ['plant', 'fire', 'earth', 'cold', 'lightning', 'water', 'air', 'metal', 'light', 'dark'];

    return (
        <div className="traits-container">
            {traitList.map((trait, index) => (
                <TraitToggle key={index} trait={trait} dragon_id={dragon_id} traits={traits} />
            ))}
        </div>
    );
};

export default Traits;