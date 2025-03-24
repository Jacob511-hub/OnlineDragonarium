import { useState } from "react";

const TraitToggle: React.FC<{ trait: string }> = ({ trait }) => {
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => setIsOn(!isOn);

    return (
        <img
            src={`/images/traits/${trait}-${isOn ? 'on' : 'off'}.png`}
            onClick={handleClick}
            style={{cursor: "pointer", transition: "opacity 0.3s", opacity: isOn ? 1 : 0.3}}
        />
    );
};

export default TraitToggle;