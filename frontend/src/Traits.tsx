import React from "react";
import TraitToggle from "./TraitToggle";

const Traits: React.FC<{ can_be_traited: boolean, dragon_id: number }> = ({ can_be_traited, dragon_id }) => {
    if (!can_be_traited) return null;

    const traits = ['plant', 'fire', 'earth', 'cold', 'lightning', 'water', 'air', 'metal', 'light', 'dark'];

    return (
        <div className="traits-container">
            {traits.map((trait, index) => (
                <TraitToggle key={index} trait={trait} dragon_id={dragon_id} />
            ))}
        </div>
    );
};

export default Traits;