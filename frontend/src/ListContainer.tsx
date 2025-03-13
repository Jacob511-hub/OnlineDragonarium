import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Dragon from "./Dragon";

interface DragonData {
  id: number;
  name: string;
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
};

const ListContainer: React.FC<{ filters: Record<string, number>; onClick: (name: string) => void }> = ({ filters, onClick }) => {
    const [dragons, setDragons] = useState<DragonData[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchDragons = async () => {
        try {
          const response = await axios.get("http://localhost:5000/dragons");
          let filteredDragons = response.data;
  
          const includeElements = Object.keys(filters).filter((key) => filters[key] === 1);
          const excludeElements = Object.keys(filters).filter((key) => filters[key] === 2);
  
          if (includeElements.length > 0) {
            filteredDragons = filteredDragons.filter((dragon: DragonData) =>
              includeElements.every((element) => dragon.elements.includes(element))
            );
          }
  
          if (excludeElements.length > 0) {
            filteredDragons = filteredDragons.filter((dragon: DragonData) =>
              excludeElements.every((element) => !dragon.elements.includes(element))
            );
          }
  
          setDragons(filteredDragons);
        } catch (err) {
          setError("Error fetching dragons");
          console.error(err);
        }
      };
  
      fetchDragons();
    }, [filters]);
  
    if (error) return <div>{error}</div>;
  
    return (
      <div className="list-container">
        {dragons.length > 0 ? (
          dragons.map((dragon) => {
            const imageSrc = imageMap[dragon.name] || "/images/default.webp";
            return <Dragon key={dragon.id} src={imageSrc} onClick={() => onClick(imageSrc)} />;
          })
        ) : (
          <p>No dragons found.</p>
        )}
      </div>
    );
  };

export default ListContainer;