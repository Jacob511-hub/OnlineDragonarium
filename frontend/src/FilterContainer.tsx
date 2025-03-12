import React from "react";
import FilterButton from "./FilterButton";
import IconFire from './images/Icon_Fire.webp';
import IconPlant from './images/Icon_Plant.webp';

const FilterContainer: React.FC<{ onFilter: (name: string) => void }> = ({ onFilter }) => {
  return (
    <div className="container">
      <div className="filter-box">
        <FilterButton src={IconFire} name="Fire" onClick={onFilter} />
        <FilterButton src={IconPlant} name="Plant" onClick={onFilter} />
      </div>
    </div>
  );
};

export default FilterContainer;