import React, { useMemo } from "react";
import useDragons from "./hooks/useDragons";
import Dragon from "./Dragon";
import { imageMap } from "./imageMap";

interface DragonData {
  id: number;
  name: string;
  can_be_traited: boolean;
  is_only_traited: boolean;
  elements: string[];
}

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
