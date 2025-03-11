// import React from 'react';
// import './App.css';
// import DataComponent from './DataComponent';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <DataComponent />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { useState } from "react";
//import Fire from '../src/assets/images/Fire.webp';
import FilterContainer from "./FilterContainer";
import ListContainer from "./ListContainer";
import InfoContainer from "./InfoContainer";

const useSelectedDragon = (initialSrc: string) => {
    const [selectedDragon, setSelectedDragon] = useState(initialSrc);
    return { selectedDragon, setSelectedDragon };
};

const App: React.FC = () => {
    const { selectedDragon, setSelectedDragon } = useSelectedDragon("undefined");
  return (
    <div className="app">
        <FilterContainer />
        <ListContainer onSelect={setSelectedDragon} />
        <InfoContainer selectedSrc={selectedDragon} />
    </div>
  );
};

export default App;