import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Medicine() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    }; 
  
    return (
<<<<<<< HEAD
        <div>
            <h1>Hello From Medicine</h1>
        </div>
    );
}
=======
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Medicine
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add medicine data</DialogTitle>
          <DialogContent>
>>>>>>> b9c4d69c3eba6a7f06a4e15ba452b055fcb2243c




            <TextField
              margin="dense"
              id="name"
              label="Medicine Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="Medicine Price"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="Medicine Quantity"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="Medicine Expiry"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }