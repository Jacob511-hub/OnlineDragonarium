import React from "react";
import AdminElementButton from "./AdminElementButton";
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
import IconRift from './images/Icon_Rift.webp';
import IconSun from './images/Icon_Sun.webp';
import IconMoon from './images/Icon_Moon.webp';
import IconTreasure from './images/Icon_Treasure.webp';
import IconOlympus from './images/Icon_Olympus.webp';
import IconSeasonal from './images/Icon_Seasonal.webp';
import IconApocalypse from './images/Icon_Apocalypse.webp';
import IconDream from './images/Icon_Dream.webp';
import IconSnowflake from './images/Icon_Snowflake.webp';
import IconMonolith from './images/Icon_Monolith.webp';
import IconChrysalis from './images/Icon_Chrysalis.webp';
import IconOrnamental from './images/Icon_Ornamental.webp';
import IconAura from './images/Icon_Aura.webp';
import IconHidden from './images/Icon_Hidden.webp';
import IconSurface from './images/Icon_Surface.webp';
import IconMelody from './images/Icon_Melody.webp';
import IconZodiac from './images/Icon_Zodiac.webp';
import IconGemstone from './images/Icon_Gemstone.webp';
import IconCrystalline from './images/Icon_Crystalline.webp';
import IconGalaxy from './images/Icon_Galaxy.webp';

const elementIcons = [
    IconFire, IconPlant, IconLightning, IconEarth, IconCold, IconMetal, IconWater, IconAir, IconLight, IconDark,
    IconRainbow, IconRift, IconSun, IconMoon, IconTreasure, IconOlympus, IconSeasonal, IconApocalypse, IconDream,
    IconSnowflake, IconMonolith, IconChrysalis, IconOrnamental, IconAura, IconHidden, IconSurface, IconMelody,
    IconZodiac, IconGemstone, IconCrystalline, IconGalaxy
];

interface AdminMenuElementPickerProps {
    elements: number[];
    setElements: React.Dispatch<React.SetStateAction<number[]>>;
}

const AdminMenuElementPicker: React.FC<AdminMenuElementPickerProps> = ({ elements, setElements }) => {
    const handleButtonClick = (id: number) => {
        setElements(prev => prev.includes(id) ? prev : [...prev, id]);
    };

    return (
        <div>
            <div className="admin-elements-container">
                {elementIcons.map((icon, index) => (
                    <AdminElementButton
                        key={index}
                        src={icon}
                        id={index + 1}
                        onClick={handleButtonClick}
                    />
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={elements.join(", ")}
                    onChange={(e) =>
                        setElements(e.target.value.split(",").map((el) => parseInt(el.trim())).filter((n) => !isNaN(n)))
                    }
                />
            </div>
        </div>
    );
};

export default AdminMenuElementPicker;