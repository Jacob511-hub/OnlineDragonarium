import React from "react";
import TraitToggleFixed from "./TraitToggleFixed";

const TraitsFixed: React.FC<{ is_only_traited: boolean, name: string }> = ({ is_only_traited, name }) => {
    if (!is_only_traited) return null;

    const traits = ['plant', 'fire', 'earth', 'cold', 'lightning', 'water', 'air', 'metal', 'light', 'dark'];

    return (
        <div className="traits-container-fixed">
            {traits.map((trait, index) => (
                <TraitToggleFixed key={index} trait={trait} name={name} />
            ))}
        </div>
    );
};

export default TraitsFixed;