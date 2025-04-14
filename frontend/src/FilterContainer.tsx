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

const FilterContainer: React.FC<{ onToggle: (name: string, state: number) => void }> = ({ onToggle }) => {
  return (
    <div className="filter-container">
      <div className="filter-box">
        <FilterButton src={IconFire} name="Fire" onToggle={onToggle} />
        <FilterButton src={IconPlant} name="Plant" onToggle={onToggle} />
        <FilterButton src={IconEarth} name="Earth" onToggle={onToggle} />
        <FilterButton src={IconCold} name="Cold" onToggle={onToggle} />
        <FilterButton src={IconAir} name="Air" onToggle={onToggle} />
        <FilterButton src={IconLightning} name="Lightning" onToggle={onToggle} />
        <FilterButton src={IconWater} name="Water" onToggle={onToggle} />
        <FilterButton src={IconMetal} name="Metal" onToggle={onToggle} />
        <FilterButton src={IconLight} name="Light" onToggle={onToggle} />
        <FilterButton src={IconDark} name="Dark" onToggle={onToggle} />
        <FilterButton src={IconRift} name="Rift" onToggle={onToggle} />
        <FilterButton src={IconRainbow} name="Rainbow" onToggle={onToggle} />
        <FilterButton src={IconSun} name="Sun" onToggle={onToggle} />
        <FilterButton src={IconMoon} name="Moon" onToggle={onToggle} />
        <FilterButton src={IconTreasure} name="Treasure" onToggle={onToggle} />
        <FilterButton src={IconOlympus} name="Olympus" onToggle={onToggle} />
        <FilterButton src={IconSeasonal} name="Seasonal" onToggle={onToggle} />
        <FilterButton src={IconApocalypse} name="Apocalypse" onToggle={onToggle} />
        <FilterButton src={IconDream} name="Dream" onToggle={onToggle} />
        <FilterButton src={IconSnowflake} name="Snowflake" onToggle={onToggle} />
        <FilterButton src={IconMonolith} name="Monolith" onToggle={onToggle} />
        <FilterButton src={IconChrysalis} name="Chrysalis" onToggle={onToggle} />
        <FilterButton src={IconOrnamental} name="Ornamental" onToggle={onToggle} />
        <FilterButton src={IconAura} name="Aura" onToggle={onToggle} />
        <FilterButton src={IconHidden} name="Hidden" onToggle={onToggle} />
        <FilterButton src={IconSurface} name="Surface" onToggle={onToggle} />
        <FilterButton src={IconMelody} name="Melody" onToggle={onToggle} />
        <FilterButton src={IconZodiac} name="Zodiac" onToggle={onToggle} />
        <FilterButton src={IconGemstone} name="Gemstone" onToggle={onToggle} />
        <FilterButton src={IconCrystalline} name="Crystalline" onToggle={onToggle} />
        <FilterButton src={IconGalaxy} name="Galaxy" onToggle={onToggle} />
      </div>
    </div>
  );
};

export default FilterContainer;