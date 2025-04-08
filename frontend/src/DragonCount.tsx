import React from "react";
import useCurrentUser from "./hooks/useCurrentUser";

const DragonCount: React.FC<{ dragon_id: number; can_be_traited: boolean }> = ({ dragon_id, can_be_traited }) => {
    const user_id = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";
    
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