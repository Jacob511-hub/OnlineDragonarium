import React from "react";

const FilterButton: React.FC<{ src: string; name: string }> = ({ src, name }) => {
    return (
        <div className="filter-button" style={{ cursor: "pointer" }}>
            <img src={src} />
            <p>{name}</p>
        </div>
    );
};

export default FilterButton;