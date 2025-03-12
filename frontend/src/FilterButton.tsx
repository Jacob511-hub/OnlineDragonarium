import React, { useState } from "react";

interface FilterButtonProps {
    src: string;
    name: string;
    onToggle: (name: string, state: number) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ src, name, onToggle }) => {
    const [state, setState] = useState(0);
  
    const handleClick = () => {
      const newState = (state + 1) % 3;
      setState(newState);
      onToggle(name, newState);
    };
  
    const getColor = () => {
      if (state === 1) return "green";
      if (state === 2) return "rgb(172, 0, 0)";
      return "rgb(104, 104, 104)";
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