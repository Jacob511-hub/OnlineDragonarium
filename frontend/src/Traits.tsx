import React from "react";
import TraitToggle from "./TraitToggle";
import useTraits from "./hooks/useTraits";

const Traits: React.FC<{ can_be_traited: boolean, dragon_id: number }> = ({ can_be_traited, dragon_id }) => {
    const { traits, error } = useTraits();

    if (!can_be_traited) return null;
    if (error) return <div>Error: {error}</div>;
    if (!traits) return null;

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