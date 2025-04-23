import React, { useState } from "react";

interface FilterButtonProps {
    src: string;
    name: string;
    state: number;
    onToggle: (name: string, state: number) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ src, name, state, onToggle }) => {
    const handleClick = () => {
      const newState = (state + 1) % 3;
      onToggle(name, newState);
    };
  
    const getColor = () => {
      if (state === 1) return "green";
      if (state === 2) return "rgb(172, 0, 0)";
      return "rgb(139, 139, 139)";
    };

    return (
        <div
          className="filter-button"
          style={{ cursor: "pointer", backgroundColor: getColor() }}
          onClick={handleClick}
        >
          <img src={src} alt={`${name} icon`} />
          <p>{name}</p>
        </div>
      );
};

export default FilterButton;