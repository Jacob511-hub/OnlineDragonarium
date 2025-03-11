import React from "react";

const DragonDisplay: React.FC<{ src: string }> = ({ src }) => {
    return (
        <div className="dragon-display">
            <img
                src={src}
            />
        </div>
    );
};

export default DragonDisplay;