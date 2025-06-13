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
    width: "450px",
    maxWidth: "75%",
    height: "300px",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    outline: 'none',
    '&:focus-visible': {
        outline: 'none',
    }, 
};

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
                <img style={{width: '100%', height: 'auto'}} src={'./images/guide_1'}></img>
            </Box>
        </Modal>
    </>
  );
};

export default GuideModal;