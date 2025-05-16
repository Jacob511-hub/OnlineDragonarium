import React from "react";
import useCurrentUser from "./hooks/useCurrentUser";
import useDragonCounts from "./hooks/useDragonCounts";
import ElementsDisplay from "./ElementsDisplay";
import BreedingHint from "./BreedingHint";
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

const DragonDisplay: React.FC<{ src: string; elements: string[]; id: number; setSelectedDragonId: (dragonId: number) => void }> = ({ src, elements, id, setSelectedDragonId }) => {
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
        Rift: IconRift,
        Sun: IconSun,
        Moon: IconMoon,
        Treasure: IconTreasure,
        Olympus: IconOlympus,
        Seasonal: IconSeasonal,
        Apocalypse: IconApocalypse,
        Dream: IconDream,
        Snowflake: IconSnowflake,
        Monolith: IconMonolith,
        Chrysalis: IconChrysalis,
        Ornamental: IconOrnamental,
        Aura: IconAura,
        Hidden: IconHidden,
        Surface: IconSurface,
        Melody: IconMelody,
        Zodiac: IconZodiac,
        Gemstone: IconGemstone,
        Crystalline: IconCrystalline,
        Galaxy: IconGalaxy,
    };

    const user_id = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";

    const { counts } = useDragonCounts({ user_id: userIdString, dragon_id: id });

    let image = "./images/tile.png";
    let filter = "none";

    if (counts) {
        const { count_normal, count_traited, count_twin, count_traited_twin } = counts;

        const hasNormal = count_normal > 0 || count_traited > 0;
        const hasTwin = count_twin > 0 || count_traited_twin > 0;

        if (!hasNormal && !hasTwin) {
            filter = 'brightness(0.4)';
        } else if (hasNormal && hasTwin) {
            image = "./images/tile_gold.png";
        } else if (hasTwin) {
            image = "./images/tile_twin.png";
        }
    } else {
        filter = 'brightness(0.4)';
    }

    return (
        <div className="dragon-display">
            <div style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                padding: 'calc(5%)',
                boxSizing: 'border-box',
                position: 'relative',
                filter
            }}>
                <img src={src} alt=""/>
                <ElementsDisplay elements={elements} elementIcons={elementIcons} />
            </div>
            <BreedingHint id={id} setSelectedDragonId={setSelectedDragonId} />
        </div>
    );
};

export default DragonDisplay;