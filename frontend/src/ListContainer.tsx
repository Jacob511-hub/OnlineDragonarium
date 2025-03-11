// import React from "react";
// import Fire from '../src/assets/images/Fire.webp';
// import Plant from '../src/assets/images/Plant.webp';
// import Lightning from '../src/assets/images/Lightning.webp';
// import Earth from '../src/assets/images/Earth.webp';
// import Air from '../src/assets/images/Air.webp';
// import Metal from '../src/assets/images/Metal.webp';
// import Cold from '../src/assets/images/Cold.webp';
// import Water from '../src/assets/images/Water.webp';
// import Light from '../src/assets/images/Light.webp';
// import Dark from '../src/assets/images/Dark.webp';
// import Dragon from "./Dragon";

const ListContainer: React.FC<{ onSelect: (src: string) => void }> = ({ onSelect }) => {
    return (
        <div className="list-container">
            {/* {[Fire, Plant, Lightning, Earth, Cold, Metal, Water, Air, Light, Dark].map((type) => (
                <Dragon key={type} src={type} onClick={() => onSelect(type)} />
            ))} */}
        </div>
    );
};

export default ListContainer;