import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { keyframes } from "@emotion/react";

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

const GuideModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "white",
    transform: "translate(-50%, -50%)",
    animation: `${slideDownFade} 0.3s ease-out`,
    width: "600px",
    maxWidth: "75%",
    height: "500px",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    outline: 'none',
    '&:focus-visible': {
        outline: 'none',
    }, 
  };

  const imgStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  }

  return (
    <>
        <button 
            onClick={handleOpen}
            className='button-default'
            style={{
                position: 'fixed',
                top: 10,
                left: 10,
                zIndex: 99,
            }}
        >
        Guide
        </button>

        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <h1 style={{marginTop: "0px"}}>Guide</h1>
                <p>Here are some tips to help you use the Online Dragonarium</p>
                <img style={imgStyle} src={'./images/guide_1.png'} alt="" />
                <p>Click on a dragon from the list to view its details in the info panel.</p>
                <img style={imgStyle} src={'./images/guide_2.png'} alt="" />
                <p>The info panel displays several pieces of information regarding each dragon:</p>
                <ul>
                    <li><strong>Name:</strong> The name of the dragon.</li>
                    <li><strong>Elements:</strong> The elemental types of the dragon.</li>
                    <li><strong>Hint:</strong> Click the egg with the "?" to view how to obtain the dragon.</li>
                    <li><strong>Traits:</strong> Toggle which Traits you have unlocked on that dragon (not all dragons can have Traits, and some are inherently locked to a specific Trait).</li>
                    <li><strong>Owned:</strong> Modify the number of that dragon you own. Normal and Twin variants can be tracked individually, as well as Normal Traited and Twin Traited variants for dragons that can have Traits.</li>
                </ul>
            </Box>
        </Modal>
    </>
  );
};

export default GuideModal;