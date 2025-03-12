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
import axios from "axios";
import Dragon from "./Dragon";

interface Data {
  id: number;
  name: string;
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
};

const ListContainer: React.FC<{ onSelect: (src: string) => void }> = ({ onSelect }) => {
    const [data, setData] = useState<Data[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      axios
        .get("http://localhost:5000/dragons")
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setError("Error fetching data");
          console.error(err);
        });
    }, []);
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div className="list-container">
        {data.map((item) => {
          const imageSrc = imageMap[item.name];
          return <Dragon key={item.id} src={imageSrc} onClick={() => onSelect(imageSrc)} />;
        })}
      </div>
    );
  };

export default ListContainer;