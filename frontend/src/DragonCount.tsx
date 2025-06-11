import React from "react";
import { useCurrentUser } from "./CurrentUserContext";
import useDragonCounts from "./hooks/useDragonCounts";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const DragonCount: React.FC<{ dragon_id: number; can_be_traited: boolean; is_only_traited: boolean }> = ({ dragon_id, can_be_traited, is_only_traited }) => {
    const { user_id } = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";
    
    const { counts, updateCount } = useDragonCounts({ user_id: userIdString, dragon_id });

    const renderInputWithButtons = (
        countKey: keyof typeof counts,
        value: number | null | undefined,
        inputStyle?: React.CSSProperties
    ) => {
        const currentValue = value ?? 0;

        const increment = () => updateCount(countKey, currentValue + 1);
        const decrement = () => {
            if (currentValue > 0) updateCount(countKey, currentValue - 1);
        };

        const buttonStyle = {
            backgroundColor: 'white',
            borderRadius: '8px',
            '&:hover': {
                backgroundColor: '#f0f0f0',
            },
        };

        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                    type="number"
                    placeholder="# of Dragons"
                    min={0}
                    value={value ?? ""}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        updateCount(countKey, val >= 0 ? val : 0);
                    }}
                    style={{ width: 80, ...inputStyle }}
                />
                <IconButton size="small" onClick={decrement} aria-label="decrease" sx={buttonStyle}>
                    <RemoveIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={increment} aria-label="increase" sx={buttonStyle}>
                    <AddIcon fontSize="small" />
                </IconButton>
            </div>
        );
    };

    return (
        <div className="count-container">
            <h1 style={{textDecoration: 'underline', fontSize: '3em'}} className="header">Owned:</h1>

            <h1 style={{textDecoration: 'underline'}} className="header">Normal</h1>

            {!is_only_traited && (
                <>
                    <h2 className="header">Non-Traited</h2>
                    {renderInputWithButtons("count_normal", counts.count_normal)}
                </>
            )}

            {(can_be_traited || is_only_traited) && (
                <>
                    <h2 className="header">Traited</h2>
                    {renderInputWithButtons("count_traited", counts.count_traited)}
                </>
            )}

            {!is_only_traited &&(<h1 style={{textDecoration: 'underline', color: '#1199ff'}} className="header">Twins</h1>)}

            {!is_only_traited && (
                <>
                    <h2 style={{color: '#1199ff'}} className="header">Non-Traited</h2>
                    {renderInputWithButtons("count_twin", counts.count_twin, { backgroundColor: '#1199ff' })}
                </>
            )}

            {(can_be_traited && !is_only_traited) && (
                <>
                    <h2 style={{color: '#1199ff'}} className="header">Traited</h2>
                    {renderInputWithButtons("count_traited_twin", counts.count_traited_twin, { backgroundColor: '#1199ff' })}
                </>
            )}
        </div>
    );
};

export default DragonCount;