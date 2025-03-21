import React from "react";

const DragonCount: React.FC = () => {
    return (
        <div className="count-container">
            <h1 style={{textDecoration: 'underline'}} className="header">Normal Dragons</h1>
            <h2 className="header">Non-Traited Dragons</h2>
            <input type="number" placeholder="# of Dragons" min={0}/>
            <h2 className="header">Traited Dragons</h2>
            <input type="number" placeholder="# of Dragons" min={0}/>
            <h1 style={{textDecoration: 'underline', color: '#1199ff'}} className="header">Twin Dragons</h1>
            <h2 style={{color: '#1199ff'}} className="header">Non-Traited Dragons</h2>
            <input type="number" placeholder="# of Dragons" min={0}/>
            <h2 style={{color: '#1199ff'}} className="header">Traited Dragons</h2>
            <input type="number" placeholder="# of Dragons" min={0}/>
        </div>
      );
};

export default DragonCount;