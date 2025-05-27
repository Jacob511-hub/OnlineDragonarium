import React from "react";
import TraitToggle from "./TraitToggle";
import useTraits from "./hooks/useTraits";
import { useCurrentUser } from "./CurrentUserContext";
import useUserDragonTraits from "./hooks/useUserDragonTraits";

const Traits: React.FC<{ can_be_traited: boolean, dragon_id: number }> = ({ can_be_traited, dragon_id }) => {
    const { user_id } = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";
    
    const { traits, error: traitError } = useTraits();
    const { error: stateError, loading } = useUserDragonTraits(userIdString, dragon_id);

    if (!can_be_traited) return null;
    if (traitError || stateError) return <div>Error: {traitError || stateError}</div>;
    if (!traits || loading) return null;

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