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

const FilterContainer: React.FC<{ onFilter: (name: string) => void }> = ({ onFilter }) => {
  return (
    <div className="container">
      <div className="filter-box">
        <FilterButton src={IconFire} name="Fire" onClick={onFilter} />
        <FilterButton src={IconPlant} name="Plant" onClick={onFilter} />
        <FilterButton src={IconEarth} name="Earth" onClick={onFilter} />
        <FilterButton src={IconCold} name="Cold" onClick={onFilter} />
        <FilterButton src={IconAir} name="Air" onClick={onFilter} />
        <FilterButton src={IconLightning} name="Lightning" onClick={onFilter} />
        <FilterButton src={IconWater} name="Water" onClick={onFilter} />
        <FilterButton src={IconMetal} name="Metal" onClick={onFilter} />
        <FilterButton src={IconLight} name="Light" onClick={onFilter} />
        <FilterButton src={IconDark} name="Dark" onClick={onFilter} />
      </div>
    </div>
  );
};

export default FilterContainer;