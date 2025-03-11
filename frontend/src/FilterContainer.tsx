import React from "react";
import FilterButton from "./FilterButton";
// import IconFire from '../src/assets/images/Icon_Fire.webp';
// import IconPlant from '../src/assets/images/Icon_Plant.webp';

const FilterContainer: React.FC = () => {
  return (
    <div className="container">
        <div className="filter-box">
            {/* <FilterButton src={IconFire} name={"Fire"} ></FilterButton>
            <FilterButton src={IconPlant} name={"Plant"} ></FilterButton> */}
        </div>
    </div>
  );
};

export default FilterContainer;