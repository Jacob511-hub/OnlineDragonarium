import React from "react";
import FilterButton from "./FilterButton";
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

interface FilterContainerProps {
  filters: { [name: string]: number };
  onToggle: (name: string, state: number) => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({ filters, onToggle }) => {
  const buttons = [
    { name: "Fire", src: IconFire },
    { name: "Plant", src: IconPlant },
    { name: "Earth", src: IconEarth },
    { name: "Cold", src: IconCold },
    { name: "Air", src: IconAir },
    { name: "Lightning", src: IconLightning },
    { name: "Water", src: IconWater },
    { name: "Metal", src: IconMetal },
    { name: "Light", src: IconLight },
    { name: "Dark", src: IconDark },
    { name: "Rift", src: IconRift },
    { name: "Rainbow", src: IconRainbow },
    { name: "Sun", src: IconSun },
    { name: "Moon", src: IconMoon },
    { name: "Treasure", src: IconTreasure },
    { name: "Olympus", src: IconOlympus },
    { name: "Seasonal", src: IconSeasonal },
    { name: "Apocalypse", src: IconApocalypse },
    { name: "Dream", src: IconDream },
    { name: "Snowflake", src: IconSnowflake },
    { name: "Monolith", src: IconMonolith },
    { name: "Chrysalis", src: IconChrysalis },
    { name: "Ornamental", src: IconOrnamental },
    { name: "Aura", src: IconAura },
    { name: "Hidden", src: IconHidden },
    { name: "Surface", src: IconSurface },
    { name: "Melody", src: IconMelody },
    { name: "Zodiac", src: IconZodiac },
    { name: "Gemstone", src: IconGemstone },
    { name: "Crystalline", src: IconCrystalline },
    { name: "Galaxy", src: IconGalaxy },
  ];

  return (
    <div className="filter-container">
      <div className="filter-box">
        {buttons.map(({ name, src }) => (
          <FilterButton
            key={name}
            src={src}
            name={name}
            state={filters[name] ?? 0}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterContainer;