import React, { useMemo } from "react";
import useDragons from "./hooks/useDragons";
import Fire from './images/Fire.webp';
import Plant from './images/Plant.webp';
import Lightning from './images/Lightning.webp';
import Earth from './images/Earth.webp';
import Air from './images/Air.webp';
import Metal from './images/Metal.webp';
import Cold from './images/Cold.webp';
import Water from './images/Water.webp';
import Light from './images/Light.webp';
import Dark from './images/Dark.webp';
import Poison from './images/Poison.webp';
import Tree from './images/Tree.webp';
import Lava from './images/Lava.webp';
import Storm from './images/Storm.webp';
import Rain from './images/Rain.webp';
import Mountain from './images/Mountain.webp';
import Firefly from './images/Firefly.webp';
import Quake from './images/Quake.webp';
import Dragon from "./Dragon";
interface DragonData {
  id: number;
  name: string;
  can_be_traited: boolean;
  elements: string[];
}

const imageMap: { [key: string]: string } = {
  Fire: Fire,
  Plant: Plant,
  Lightning: Lightning,
  Earth: Earth,
  Air: Air,
  Metal: Metal,
  Cold: Cold,
  Water: Water,
  Light: Light,
  Dark: Dark,
  Poison: Poison,
  Tree: Tree,
  Lava: Lava,
  Storm: Storm,
  Rain: Rain,
  Mountain: Mountain,
  Firefly: Firefly,
  Quake: Quake,
};

const ListContainer: React.FC<{ filters: Record<string, number>; onClick: (id: number) => void }> = ({ filters, onClick }) => {
  const { dragons, error } = useDragons();

  const filteredDragons = useMemo(() => {
    if (!dragons.length) return [];

    const includeElements = Object.keys(filters).filter((key) => filters[key] === 1);
    const excludeElements = Object.keys(filters).filter((key) => filters[key] === 2);

    return dragons.filter((dragon: DragonData) =>
      includeElements.every((element) => dragon.elements.includes(element)) &&
      excludeElements.every((element) => !dragon.elements.includes(element))
    );
  }, [dragons, filters]);

  if (error) return <div>{error}</div>;

  return (
    <div className="list-container">
      {filteredDragons.length > 0 ? (
        filteredDragons.map((dragon) => (
          <Dragon
            key={dragon.id}
            id={dragon.id}
            can_be_traited={dragon.can_be_traited}
            src={imageMap[dragon.name]}
            onClick={() => onClick(dragon.id)}
          />
        ))
      ) : (
        <p>No dragons found.</p>
      )}
    </div>
  );
};

export default ListContainer;
