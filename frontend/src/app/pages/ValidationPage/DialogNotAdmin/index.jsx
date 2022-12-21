import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const DialogNotAdmin = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>You are not authorized to view this page!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your account is not an Admin account. <br />
                    Please return to the homepage.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} autoFocus>
                    Back
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogNotAdmin;