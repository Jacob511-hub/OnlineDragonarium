import React, { useState } from "react";
import FilterContainerModal from "./FilterContainerModal";
import ListContainer from "./ListContainer";
import InfoContainer from "./InfoContainer";
import LogoutButton from "./LogoutButton";
import AdminMenu from "./AdminMenu";
import bgImage from './images/bg-kairos.webp';
import useInitializeTraits from "./hooks/useInitializeTraits";
import useInitializeCounts from "./hooks/useInitializeCounts";

document.body.style.backgroundImage = `url(${bgImage})`;

const useSelectedDragon = (initialId: number | null) => {
  const [selectedDragonId, setSelectedDragonId] = useState<number | null>(initialId);
  return { selectedDragonId, setSelectedDragonId };
};

const App: React.FC = () => {
  useInitializeTraits();
  useInitializeCounts();
  const { selectedDragonId, setSelectedDragonId } = useSelectedDragon(null);
  const [filters, setFilters] = useState<Record<string, number>>({});

  const handleToggle = (name: string, state: number) => {
    setFilters((prev) => ({ ...prev, [name]: state }));
  };

  return (
    <div className="app">
      <FilterContainerModal filters={filters} onToggle={handleToggle} />
      <ListContainer filters={filters} onClick={(id: number) => setSelectedDragonId(id)} />
      <InfoContainer selectedDragonId={selectedDragonId} setSelectedDragonId={setSelectedDragonId} />
      <LogoutButton />
      <AdminMenu />
    </div>
  );
};

export default App;

