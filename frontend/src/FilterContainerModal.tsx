import React, { useState, useEffect } from 'react';
import { Modal, Box, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterContainer from './FilterContainer';

interface FilterContainerModalProps {
    filters: { [name: string]: number };
    onToggle: (name: string, state: number) => void;
  }

const FilterContainerModal: React.FC<FilterContainerModalProps> = ({ filters, onToggle }) => {
  const isMobile = useMediaQuery('(max-width:1200px)');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {isMobile ? (
        <>
          <button 
            onClick={handleOpen}
            style={{
              position: 'fixed',
              top: 10,
              right: 10,
              zIndex: 99,
            }}
          >
            Filters
          </button>
          <Modal open={open} onClose={handleClose}>
            <Box 
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '500px',
                backgroundColor: 'gray',
                borderRadius: 2,
                boxShadow: 24,
                p: 3,
              }}
            >
              <FilterContainer filters={filters} onToggle={onToggle} />
            </Box>
          </Modal>
        </>
      ) : (
        <FilterContainer filters={filters} onToggle={onToggle} />
      )}
    </>
  );
};

export default FilterContainerModal;
