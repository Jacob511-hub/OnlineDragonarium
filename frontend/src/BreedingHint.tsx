import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import useDragonSlug from "./hooks/useDragonSlug";

const BreedingHint: React.FC<{ id: number; setSelectedDragonId: (dragonId: number) => void }> = ({ id, setSelectedDragonId }) => {
    const [open, setOpen] = useState(false);
    const [hintParts, setHintParts] = useState<React.ReactNode>("Loading...");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const rawHint = "This dragon is bred using a ${rain} Dragon and a ${mountain} Dragon";

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
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '500px',
                    backgroundColor: 'gray',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                }}
                >
                    <h1>Breeding Hint</h1>
                    <p>{hintParts}</p>
                </Box>
            </Modal>
        </>
    )
};

export default BreedingHint;