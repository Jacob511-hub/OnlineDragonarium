import React, { useState, useEffect, useMemo } from "react";
import { Modal, Box } from "@mui/material";
import useDragonSlug from "./hooks/useDragonSlug";
import useDragonID from "./hooks/useDragonID";
import { keyframes } from "@emotion/react";

const BreedingHint: React.FC<{ id: number; setSelectedDragonId: (dragonId: number) => void }> = ({ id, setSelectedDragonId }) => {
    const [open, setOpen] = useState(false);
    const [hintParts, setHintParts] = useState<React.ReactNode>("Loading...");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const slideDownFade = keyframes`
        from {
            transform: translate(-50%, -60%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    `;

    const { data } = useDragonID(id);
    const hint: string | null = data?.hint ?? null;
    const rawHint = hint || "This dragon has no breeding hint available.";

    const slugs = useMemo(() => {
        const regex = /\$\{(\w+)\}/g;
        const matches = Array.from(rawHint.matchAll(regex));
        return matches.map(match => match[1]);
      }, [rawHint]);

    const { dataMap: slugToDragon, loading } = useDragonSlug(slugs);

    useEffect(() => {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;
        const regex = /\$\{(\w+)\}/g;
    
        while ((match = regex.exec(rawHint)) !== null) {
            const slug = match[1];
            const start = match.index;
    
            parts.push(rawHint.slice(lastIndex, start));
    
            const dragon = slugToDragon[slug];
    
            if (loading || !dragon) {
                parts.push(<span key={slug}>Loading...</span>);
            } else {
                parts.push(
                    <span
                        key={slug}
                        onClick={() => { setSelectedDragonId(dragon.id); handleClose(); }}
                        style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
                    >
                        {dragon.name}
                    </span>
                );
            }
    
            lastIndex = regex.lastIndex;
        }
    
        parts.push(rawHint.slice(lastIndex));
        setHintParts(parts);
    }, [rawHint, slugToDragon, loading, setSelectedDragonId]);

    return (
        <>
            <div className="breeding-hint"
                onClick={handleOpen}
                style={{
                    backgroundImage: 'url(./images/BreedingHint.webp)'
                }}
            ></div>
            <Modal open={open} onClose={handleClose}>
                <Box 
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    backgroundColor: "white",
                    transform: "translate(-50%, -50%)",
                    animation: `${slideDownFade} 0.3s ease-out`,
                    width: "450px",
                    maxWidth: "70%",
                    height: "300px",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                    overflowY: 'auto',
                    outline: 'none',
                    '&:focus-visible': {
                        outline: 'none',
                    }, 
                }}
                >
                    <h1 style={{marginTop: "0px"}}>Breeding Hint</h1>
                    <p>{hintParts}</p>
                </Box>
            </Modal>
        </>
    )
};

export default BreedingHint;