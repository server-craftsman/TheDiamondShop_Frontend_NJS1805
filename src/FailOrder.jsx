import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"; // Import necessary components
import { Link } from "react-router-dom";

const FailOrder = ({ open, onClose, errorMessage }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <p>{errorMessage}</p>
      </DialogContent>
      <DialogActions>
      <Link to="/">
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default FailOrder;
