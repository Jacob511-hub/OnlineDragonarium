import React from "react";
import useCurrentUser from "./hooks/useCurrentUser";
import useTraitCount from "./hooks/useTraitCount";

const TraitWheel: React.FC<{ id: number; can_be_traited: boolean; }> = ({ id, can_be_traited }) => {
    const user_id = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";

    const rawTraitCount = useTraitCount({ user_id: userIdString, dragon_id: id });
    const traitCount = can_be_traited ? rawTraitCount : 0;
    const image = `./images/trait_${traitCount}.png`;

    return (
        <>
            {can_be_traited && (
                <div className="trait-wheel" style={{backgroundImage: `url(${image})`}}>
                </div>
            )}
        </>
    );
};

export default TraitWheel;