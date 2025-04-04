import React from "react";
import TraitWheel from "./TraitWheel";

const Dragon: React.FC<{ src: string; onClick: () => void }> = ({ src, onClick }) => {
    return (
        <div className="dragon" onClick={onClick} style={{ cursor: "pointer" }}>
            <img src={src} />
            <TraitWheel />
        </div>
    );
};

export default Dragon;