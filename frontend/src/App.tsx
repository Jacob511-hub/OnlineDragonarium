import React, { useState } from "react";
import FilterContainerModal from "./FilterContainerModal";
import ListContainer from "./ListContainer";
import InfoContainer from "./InfoContainer";
import LogoutButton from "./LogoutButton";
import RegisterButton from "./RegisterButton";
import AdminMenu from "./AdminMenu";
import GuideModal from "./GuideModal";
import { CurrentUserProvider } from "./CurrentUserContext";
import bgImage from './images/bg-kairos.webp';
import AppInitializer from "./AppInitializer";

document.body.style.backgroundImage = `url(${bgImage})`;

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
      <CurrentUserProvider>
        <AppInitializer />
        <FilterContainerModal filters={filters} onToggle={handleToggle} />
        <ListContainer filters={filters} onClick={(id: number) => setSelectedDragonId(id)} />
        <InfoContainer selectedDragonId={selectedDragonId} setSelectedDragonId={setSelectedDragonId} />
        <LogoutButton />
        <RegisterButton />
        <GuideModal />
        <AdminMenu />
      </CurrentUserProvider>
    </div>
  );
};

export default App;

