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
                bottom: 10,
                right: 120,
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
                    <li><strong>Elements:</strong> The elementals of the dragon.</li>
                    <li><strong>Hint:</strong> Click the egg with the "?" to view how to obtain the dragon.</li>
                    <li><strong>Traits:</strong> Toggle which Traits you have unlocked on that dragon (not all dragons can have Traits, and some are inherently locked to a specific Trait).</li>
                    <li><strong>Owned:</strong> Modify the number of that dragon you own. Normal and Twin variants can be tracked individually, as well as Normal Traited and Twin Traited variants for dragons that can have Traits.</li>
                </ul>
                <p>Use filters to only show dragons of specific elements or element combinations.</p>
                <p>Filters can be used to show all dragons containing a specific element, or all dragons that do not contain a specific element.</p>
                <p>These can be combined, such as filtering for every dragon that contains the Fire element that does not also contain the Plant element.</p>
                <img style={imgStyle} src={'./images/guide_3.png'} alt="" />
                <p>You can also create an account and log in to it to save your changes to an account to access on any device.</p>
                <p>Changes made while not logged in will be saved to the browser instead.</p>
            </Box>
        </Modal>
    </>
  );
};

export default GuideModal;