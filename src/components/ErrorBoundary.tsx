import React, { Component, ReactNode } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Something went wrong!
          </Typography>
          <Typography variant="body1" gutterBottom>
            An unexpected error occurred. Please try again.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReload}
            sx={{ marginTop: 2 }}
          >
            Reload Page
          </Button>

          {error && (
            <Accordion sx={{ marginTop: 4 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Error Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="error" gutterBottom>
                  {error.toString()}
                </Typography>
                <Typography variant="caption" component="pre">
                  {errorInfo?.componentStack}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
