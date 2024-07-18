import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
const Warning = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h5">{message || "Cannot add this item to the cart because it is already in the cart."}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onClose} color="primary" style={{borderRadius: "20px", color: "#fff", backgroundColor: "#000"}}>
          <CancelIcon style={{marginRight: "5px"}} />Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Warning;
