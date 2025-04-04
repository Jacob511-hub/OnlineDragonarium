import React from "react";
import TraitWheel from "./TraitWheel";

const Dragon: React.FC<{ id: number; can_be_traited: boolean; src: string; onClick: () => void }> = ({ id, can_be_traited, src, onClick }) => {
    return (
        <div className="dragon" onClick={onClick} style={{ cursor: "pointer" }}>
            <img src={src} />
            {can_be_traited && <TraitWheel id={id} can_be_traited={can_be_traited} />}
        </div>
    );
};

export default Dragon;