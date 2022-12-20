import { Box, Stack } from "@mui/material";
import Main from "../../components/Main";

import Sidebar from "../../components/SidebarVali";
import { useValidationPageHook } from "./ValidationPageHook";

const ValidationPage = () => {
  const { valueAction, handleOnClickSidebar, listSideBar } =
    useValidationPageHook();

  return (
    <Box sx={{ minHeight: window.innerHeight, width: '100%' }}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar
          listSideBar={listSideBar}
          handleOnClickSidebar={handleOnClickSidebar}
        />
        <Main link={valueAction} />
      </Stack>
    </Box>
  );
};

export default ValidationPage;
