import React, { useState, useEffect } from "react";
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

    const regex = /\$\{(\w+)\}/g;
    const matches = Array.from(rawHint.matchAll(regex));
    const slugs = matches.map(match => match[1]);

    const slug1 = slugs[0];
    const slug2 = slugs[1];

    const dragon1 = useDragonSlug(slug1 || "");
    const dragon2 = useDragonSlug(slug2 || "");

    const slugToDragon: Record<string, ReturnType<typeof useDragonSlug>> = {};
    if (slug1) slugToDragon[slug1] = dragon1;
    if (slug2) slugToDragon[slug2] = dragon2;

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
    
            if (dragon?.loading || !dragon?.data) {
                parts.push(<span key={slug}>Loading...</span>);
            } else {
                parts.push(
                    <span
                        key={slug}
                        onClick={() => {setSelectedDragonId(dragon.data.id); handleClose()}}
                        style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
                    >
                        {dragon.data.name}
                    </span>
                );
            }
    
            lastIndex = regex.lastIndex;
        }
    
        parts.push(rawHint.slice(lastIndex));
        setHintParts(parts);
    }, [
        rawHint,
        setSelectedDragonId,
        dragon1.loading,
        dragon1.data?.id,
        dragon1.data?.name,
        dragon2.loading,
        dragon2.data?.id,
        dragon2.data?.name,
    ]);

    return (
        <>
            <div className="breeding-hint"
                onClick={handleOpen}
                style={{
                    backgroundImage: 'url(../images/BreedingHint.webp)'
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