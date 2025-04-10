import React from "react";
import ElementsDisplay from "./ElementsDisplay";
import IconFire from './images/Icon_Fire.webp';
import IconPlant from './images/Icon_Plant.webp';
import IconEarth from './images/Icon_Earth.webp';
import IconCold from './images/Icon_Cold.webp';
import IconAir from './images/Icon_Air.webp';
import IconLightning from './images/Icon_Lightning.webp';
import IconWater from './images/Icon_Water.webp';
import IconMetal from './images/Icon_Metal.webp';
import IconLight from './images/Icon_Light.webp';
import IconDark from './images/Icon_Dark.webp';
import IconRainbow from './images/Icon_Rainbow.webp';

const DragonDisplay: React.FC<{ src: string; elements: string[] }> = ({ src, elements }) => {
    const elementIcons: { [key: string]: string } = {
        Fire: IconFire,
        Plant: IconPlant,
        Earth: IconEarth,
        Cold: IconCold,
        Air: IconAir,
        Lightning: IconLightning,
        Water: IconWater,
        Metal: IconMetal,
        Light: IconLight,
        Dark: IconDark,
        Rainbow: IconRainbow,
    };

    return (
        <div className="dragon-display">
            <img
                src={src}
            />
            <ElementsDisplay elements={elements} elementIcons={elementIcons} />
        </div>
    );
};

export default DragonDisplay;