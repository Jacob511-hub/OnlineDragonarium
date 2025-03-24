import React from "react";

const Traits: React.FC<{ can_be_traited: boolean }> = ({ can_be_traited }) => {
    if (!can_be_traited) return null;

    return (
        <div className="traits-container">
            <img src={'/images/traits/plant-off.png'} />
            <img src={'/images/traits/fire-off.png'} />
            <img src={'/images/traits/earth-off.png'} />
            <img src={'/images/traits/cold-off.png'} />
            <img src={'/images/traits/lightning-off.png'} />
            <img src={'/images/traits/water-off.png'} />
            <img src={'/images/traits/air-off.png'} />
            <img src={'/images/traits/metal-off.png'} />
            <img src={'/images/traits/light-off.png'} />
            <img src={'/images/traits/dark-off.png'} />
        </div>
      );
};

export default Traits;