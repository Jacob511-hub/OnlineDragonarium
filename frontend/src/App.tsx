import React, { useState } from "react";
import Fire from "./images/Fire.webp";
import FilterContainer from "./FilterContainer";
import ListContainer from "./ListContainer";
import InfoContainer from "./InfoContainer";

const useSelectedDragon = (initialId: number | null) => {
  const [selectedDragonId, setSelectedDragonId] = useState<number | null>(initialId);
  return { selectedDragonId, setSelectedDragonId };
};

const App: React.FC = () => {
  const { selectedDragonId, setSelectedDragonId } = useSelectedDragon(null);
  const [filters, setFilters] = useState<Record<string, number>>({});

  const handleToggle = (name: string, state: number) => {
    setFilters((prev) => ({ ...prev, [name]: state }));
  };

  return (
    <div className="app">
      <FilterContainer onToggle={handleToggle} />
      <ListContainer filters={filters} onClick={(id: number) => setSelectedDragonId(id)} />
      <InfoContainer selectedDragonId={selectedDragonId} />
    </div>
  );
};

export default App;
