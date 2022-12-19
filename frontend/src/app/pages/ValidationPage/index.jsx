import { Box, Stack } from "@mui/material";
import Main from "../../components/Main";

import Sidebar from "../../components/SidebarVali";

const ValidationPage = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Main />
      </Stack>
    </Box>
  );
};

export default ValidationPage;
