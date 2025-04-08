import React from "react";
import TraitWheel from "./TraitWheel";
import useCurrentUser from "./hooks/useCurrentUser";
import useDragonCountsStore from "./hooks/useDragonCountsStore";

const Dragon: React.FC<{ id: number; can_be_traited: boolean; src: string; onClick: () => void }> = ({ id, can_be_traited, src, onClick }) => {
    const user_id = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";

    const { getCounts } = useDragonCountsStore();
    const key = `${userIdString}_${id}`;
    const counts = getCounts(key);

    let image = "../images/tile.png";
    let opacity = 1;

    if (counts) {
        const { count_normal, count_traited, count_twin, count_traited_twin } = counts;

        const hasNormal = count_normal > 0 || count_traited > 0;
        const hasTwin = count_twin > 0 || count_traited_twin > 0;

        if (!hasNormal && !hasTwin) {
            opacity = 0.4;
        } else if (hasNormal && hasTwin) {
            image = "../images/tile_gold.png";
        } else if (hasTwin) {
            image = "../images/tile_twin.png";
        }
    } else {
        opacity = 0.4;
    }

    return (
        <div className="dragon" onClick={onClick} style={{ cursor: "pointer", backgroundImage: `url(${image})`, opacity}}>
            <img src={src}/>
            {can_be_traited && <TraitWheel id={id} can_be_traited={can_be_traited} />}
        </div>
    );
};

export default Dragon;