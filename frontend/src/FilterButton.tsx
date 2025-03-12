import React from "react";

const FilterButton: React.FC<{ src: string; name: string; onClick: (name: string) => void }> = ({ src, name, onClick }) => {
    return (
        <div className="filter-button" style={{ cursor: "pointer" }} onClick={() => onClick(name)}>
        <img src={src} alt={`${name} icon`} />
        <p>{name}</p>
        </div>
    );
};

export default FilterButton;