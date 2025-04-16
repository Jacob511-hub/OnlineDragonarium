import React from "react";

const TraitWheel: React.FC<{ is_only_traited: boolean; }> = ({ is_only_traited }) => {
    const image = `../images/trait_10.png`;

    return (
        <>
            {is_only_traited && (
                <div className="trait-wheel" style={{backgroundImage: `url(${image})`}}>
                </div>
            )}
        </>
    );
};

export default TraitWheel;