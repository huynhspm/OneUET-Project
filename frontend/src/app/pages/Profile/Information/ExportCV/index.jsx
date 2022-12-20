import React from "react";
import Title from "../../../../components/Title";
import { Box, Grid, Button, Paper } from '@mui/material';
import { PDFExport } from '@progress/kendo-react-pdf';
import CurriculumVitae from "./CurriculumVitae";

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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Paper
                            variant="outlined"
                            sx={{
                                maxWidth: '9in',
                                p: 1,
                                borderColor: 'primary.default'
                            }}
                        >
                            <PDFExport
                                ref={pdfExportComponent}
                                paperSize="A4"
                                scale={0.75}
                                imageResolution={300}
                            >
                                <CurriculumVitae
                                    // Basic
                                    avatar={props.avatar}
                                    code={props.code}
                                    name={props.name}
                                    birthday={props.birthday}
                                    gender={props.gender}
                                    emailVNU={props.emailVNU}
                                    email={props.email}
                                    phone={props.phone}
                                    address={props.address}

                                    // Education
                                    program={props.program}
                                    academicYear={props.academicYear}
                                    unit={props.unit}
                                    classID={props.classID}

                                    // Activites
                                    unionJoint={props.unionJoint}
                                    partyJoint={props.partyJoint}
                                    unionPosition={props.unionPosition}
                                    associationPosition={props.associationPosition}
                                    club={props.club}
                                />
                            </PDFExport>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExportCV;