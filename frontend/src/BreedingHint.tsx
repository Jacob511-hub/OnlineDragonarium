import React from "react";

const BreedingHint: React.FC<{ id: number }> = ({ id }) => {
    return (
        <div className="breeding-hint" style={{
            backgroundImage: 'url(../images/BreedingHint.webp)'
        }}></div>
    )
};

export default BreedingHint;