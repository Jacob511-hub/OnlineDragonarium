import React from "react";

const Dragon: React.FC<{ src: string; onClick: () => void }> = ({ src, onClick }) => {
    return (
        <div className="dragon" onClick={onClick} style={{ cursor: "pointer" }}>
            <img src={src} />
        </div>
    );
};

export default Dragon;