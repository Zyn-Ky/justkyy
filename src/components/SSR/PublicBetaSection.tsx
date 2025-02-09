"use client";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {useState} from "react";
import {changelogText} from "@/lib/devChangelogString";

export default function PublicBetaSection() {
    const [openChangelog, setOpenChangelog] = useState<boolean>(false);
    return <>
        <div className="p-4">

            <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                This website is under construction
            </Typography>
            <Typography gutterBottom>Meanwhile check the changelog...</Typography>
            <Button startIcon={<ReceiptLongIcon/>} variant="contained" onClick={() => setOpenChangelog(true)}>
                Changelog
            </Button>
        </div>
        <Dialog
            open={openChangelog}
            onClose={() => setOpenChangelog(false)}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Changelog</DialogTitle>
            <DialogContent dividers>
                <DialogContentText
                    id="scroll-dialog-description"
                    className="whitespace-break-spaces"
                >
                    {changelogText.slice(1)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenChangelog(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    </>
}