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

const FilterContainer: React.FC<{ onToggle: (name: string, state: number) => void }> = ({ onToggle }) => {
  return (
    <div className="container">
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
      </div>
    </div>
  );
};

export default FilterContainer;