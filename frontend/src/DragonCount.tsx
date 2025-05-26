import React from "react";
import { useCurrentUser } from "./CurrentUserContext";
import useDragonCounts from "./hooks/useDragonCounts";

const DragonCount: React.FC<{ dragon_id: number; can_be_traited: boolean; is_only_traited: boolean }> = ({ dragon_id, can_be_traited, is_only_traited }) => {
    const { user_id } = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";
    
    const { counts, updateCount } = useDragonCounts({ user_id: userIdString, dragon_id });

    return (
        <div className="count-container">
            <h1 style={{textDecoration: 'underline'}} className="header">Normal</h1>

            {!is_only_traited && (
                <>
                    <h2 className="header">Non-Traited</h2>
                    <input
                        type="number"
                        placeholder="# of Dragons"
                        min={0}
                        value={counts.count_normal ?? ""}
                        onChange={(e) => updateCount("count_normal", Number(e.target.value))}
                    />
                </>
            )}

            {(can_be_traited || is_only_traited) && (
                <>
                    <h2 className="header">Traited</h2>
                    <input
                        type="number"
                        placeholder="# of Dragons"
                        min={0}
                        value={counts.count_traited ?? ""}
                        onChange={(e) => updateCount("count_traited", Number(e.target.value))}
                    />
                </>
            )}

            {!is_only_traited &&(<h1 style={{textDecoration: 'underline', color: '#1199ff'}} className="header">Twins</h1>)}

            {!is_only_traited && (
                <>
                    <h2 style={{color: '#1199ff'}} className="header">Non-Traited</h2>
                    <input
                        style={{backgroundColor: '#1199ff'}}
                        type="number"
                        placeholder="# of Dragons"
                        min={0}
                        value={counts.count_twin ?? ""}
                        onChange={(e) => updateCount("count_twin", Number(e.target.value))}
                    />
                </>
            )}

            {(can_be_traited && !is_only_traited) && (
                <>
                    <h2 style={{color: '#1199ff'}} className="header">Traited</h2>
                    <input
                        style={{backgroundColor: '#1199ff'}}
                        type="number"
                        placeholder="# of Dragons"
                        min={0}
                        value={counts.count_traited_twin ?? ""}
                        onChange={(e) => updateCount("count_traited_twin", Number(e.target.value))}
                    />
                </>
            )}
        </div>
    );
};

export default DragonCount;