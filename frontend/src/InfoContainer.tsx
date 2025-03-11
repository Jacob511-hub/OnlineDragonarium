import React from "react";
import DragonDisplay from "./DragonDisplay";

const InfoContainer: React.FC<{ selectedSrc: string }> = ({ selectedSrc }) => {
    return (
        <div className="container">
            <DragonDisplay src={selectedSrc} />
        </div>
    );
};

export default InfoContainer;