import { styled, Button } from "@mui/material";


export const RedButton = styled(Button)({
    padding: "12px 8px !important",
    color: "red",
    backgroundColor: "#efefef",
    fontWeight: "bold !important",
    border: "none",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        color: 'red',
        backgroundColor: "#e1e1e1"
    }
});

export const OptionButton = styled(Button)({
    padding: "12px 8px !important",
    color: "black",
    backgroundColor: "#efefef",
    border: "none",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        color: 'black',
        backgroundColor: "#e1e1e1"
    }
});