import React from "react";
import ElementIcon from "./ElementIcon";

interface ElementsDisplayProps {
  elements: string[]; // Array of element names
  elementIcons: { [key: string]: string }; // Name-to-icon map
}

const ElementsDisplay: React.FC<ElementsDisplayProps> = ({ elements, elementIcons }) => {
  return (
    <div className="elements-display">
      {elements.map((element, index) => (
        <ElementIcon key={index} src={elementIcons[element]} name={element} />
      ))}
    </div>
  );
};

export default ElementsDisplay;
