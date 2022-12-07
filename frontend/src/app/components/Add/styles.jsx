import { Box, Button, styled } from "@mui/material";

export const InputBox = styled(Box)({
    // flexGrow: 1,
    // pl: 2,
    paddingTop: 40,
    // pt:50,
    display: 'absolute',
    // border: "1px solid rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
});

export const InputButton = styled(Button)({
    // pt: 50,
    paddingTop: 100,
    paddingBottom: 100,
    display: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
});