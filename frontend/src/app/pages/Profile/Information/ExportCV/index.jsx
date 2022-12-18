import React from "react";
import { Box, Grid, Button, Paper } from '@mui/material';
import Title from "../../../../components/Title";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import './styles.css'

const ExportCV = (props) => {
    const pdfExportComponent = React.useRef(null);
    return (
        <Box sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={10}>
                    <Box sx={{ display: 'flex', justifyContent: "left", alignItems: "center" }}>
                        <Title>
                            Hồ sơ CV
                        </Title>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ display: 'flex', justifyContent: "right", alignItems: "center" }}>
                        <Button component="div" variant="outlined" onClick={() => {
                            pdfExportComponent.current.save();
                        }} >Export</Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 1,
                            borderColor: 'primary.default'
                        }}
                    >
                        <PDFExport ref={pdfExportComponent} paperSize="A4">
                            <div className="cv">
                                <div>
                                    <p>Lương Sơn Bá</p>
                                </div>
                            </div>
                        </PDFExport>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExportCV;