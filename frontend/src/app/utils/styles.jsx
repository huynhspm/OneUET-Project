import { Box, Button, Modal, styled } from "@mui/material";


export const CenterModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const FilterBox = styled(Box)({
    height: 21, 
    fontSize: 18, 
    fontWeight: 'bold', 
    fontFamily: 'Canva Sans, Noto Sans Variable, Noto Sans, -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif'
});

export const CategoryBox = styled(Box)({
    height: 21, 
    fontSize: 14, 
    fontWeight: 'bold', 
    fontFamily: 'Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif'
});

export const InputBox = styled(Box)({
    paddingTop: 40,
    display: 'absolute',
    borderRadius: 8,
});

export const InputButton = styled(Button)({
    paddingTop: 100,
    paddingBottom: 100,
    display: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
});
