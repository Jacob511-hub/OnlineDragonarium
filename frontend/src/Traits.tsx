import React from "react";
import TraitToggle from "./TraitToggle";

const Traits: React.FC<{ can_be_traited: boolean }> = ({ can_be_traited }) => {
    if (!can_be_traited) return null;
    const traits = ['plant', 'fire', 'earth', 'cold', 'lightning', 'water', 'air', 'metal', 'light', 'dark'];

    return (
        <div className="traits-container">
            {traits.map((trait) => (
                <TraitToggle key={trait} trait={trait} />
            ))}
        </div>
    );
};

export default Traits;