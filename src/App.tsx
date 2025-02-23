import React from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";

import theme from "./theme/MyTheme";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import ConfirmationModal from "./components/ConfirmationModal";
import CustomSnackbar from "./components/CustomSnackbar";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <Header />
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <TaskList />
          </Container>
          <TaskModal />
          <ConfirmationModal />
          <CustomSnackbar />
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
