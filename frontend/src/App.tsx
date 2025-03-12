import React from "react";
import { useState } from "react";
import Fire from './images/Fire.webp';
import FilterContainer from "./FilterContainer";
import ListContainer from "./ListContainer";
import InfoContainer from "./InfoContainer";

const useSelectedDragon = (initialSrc: string) => {
    const [selectedDragon, setSelectedDragon] = useState(initialSrc);
    return { selectedDragon, setSelectedDragon };
};

const App: React.FC = () => {
  const { selectedDragon, setSelectedDragon } = useSelectedDragon(Fire);
  const [filters, setFilters] = useState<Record<string, number>>({});

  const handleToggle = (name: string, state: number) => {
    setFilters((prev) => ({ ...prev, [name]: state }));
  };
  return (
    <div className="app">
        <FilterContainer onToggle={handleToggle} />
        <ListContainer filters={filters} onClick={setSelectedDragon}/>
        <InfoContainer selectedSrc={selectedDragon} />
    </div>
  );
};

export default App;