import React from "react";
import TraitWheel from "./TraitWheel";
import TraitWheelStatic from "./TraitWheelStatic";
import useCurrentUser from "./hooks/useCurrentUser";
import useDragonCounts from "./hooks/useDragonCounts";

const Dragon: React.FC<{ id: number; can_be_traited: boolean; is_only_traited: boolean; src: string; onClick: () => void }> = ({ id, can_be_traited, is_only_traited, src, onClick }) => {
    const user_id = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";

    const { counts } = useDragonCounts({ user_id: userIdString, dragon_id: id });

    let image = "./images/tile.png";
    let filter = "none";

    if (counts) {
        const { count_normal, count_traited, count_twin, count_traited_twin } = counts;

        const hasNormal = count_normal > 0 || count_traited > 0;
        const hasTwin = count_twin > 0 || count_traited_twin > 0;

        if (!hasNormal && !hasTwin) {
            filter = 'brightness(0.4)';
        } else if (hasNormal && hasTwin) {
            image = "./images/tile_gold.png";
        } else if (hasTwin) {
            image = "./images/tile_twin.png";
        }
    } else {
        filter = 'brightness(0.4)';
    }

    return (
        <div className="dragon" onClick={onClick} style={{ cursor: "pointer", backgroundImage: `url(${image})`, filter}}>
            <img src={src} alt=""/>
            {can_be_traited && <TraitWheel id={id} can_be_traited={can_be_traited} />}
            {is_only_traited && <TraitWheelStatic is_only_traited={is_only_traited} />}
        </div>
    );
};

export default Dragon;