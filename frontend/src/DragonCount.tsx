import React from "react";

const DragonCount: React.FC<{ can_be_traited: boolean }> = ({ can_be_traited }) => {
    return (
        <div className="count-container">
            <h1 style={{textDecoration: 'underline'}} className="header">Normal Dragons</h1>

            <h2 className="header">Non-Traited Dragons</h2>
            <input type="number" placeholder="# of Dragons" min={0}/>

            {can_be_traited && (
                <>
                    <h2 className="header">Traited Dragons</h2>
                    <input type="number" placeholder="# of Dragons" min={0} />
                </>
            )}


            <h1 style={{textDecoration: 'underline', color: '#1199ff'}} className="header">Twin Dragons</h1>

            <h2 style={{color: '#1199ff'}} className="header">Non-Traited Dragons</h2>
            <input type="number" placeholder="# of Dragons" min={0}/>

            {can_be_traited && (
                <>
                    <h2 style={{color: '#1199ff'}} className="header">Traited Dragons</h2>
                    <input type="number" placeholder="# of Dragons" min={0}/>
                </>
            )}
        </div>
      );
};

export default DragonCount;