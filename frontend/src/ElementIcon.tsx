import React from "react";

interface ElementIconProps {
  src: string;
  name: string;
}

const ElementIcon: React.FC<ElementIconProps> = ({ src, name }) => {
  return (
    <div className="element-icon" title={name}>
      <img src={src} alt={name} />
    </div>
  );
};

export default ElementIcon;