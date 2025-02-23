import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ToggleButtonGroup,
  useMediaQuery,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import theme from "../theme/MyTheme";
import SortMenu from "./SortMenu";
import { useTodoStore } from "../store/useTodoStore";

const Header: React.FC = () => {
  const { tabValue, setTabValue, openModal } = useTodoStore();
  const isMobile = useMediaQuery(theme.breakpoints.down(866));

  const showAddCta = useMediaQuery(theme.breakpoints.up(405));

  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleTabChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: "all" | "completed" | "incomplete"
  ) => {
    if (newValue !== null) {
      setTabValue(newValue);
    }
  };

  return (
    <>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <Typography
            color="textPrimary"
            variant="h6"
            component="a"
            href="/"
            sx={{
              flexGrow: 0,
              fontWeight: "bold",
              textDecoration: "none",
              mr: 2,
            }}
          >
            TODO APP
          </Typography>

          {!isMobile && (
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <ToggleButtonGroup
                color="primary"
                value={tabValue}
                exclusive
                onChange={handleTabChange}
                aria-label="Platform"
              >
                <MenuItem
                  selected={tabValue === "all"}
                  onClick={() => setTabValue("all")}
                  sx={{ minWidth: 160 }}
                >
                  <ListIcon sx={{ mr: 1 }} />
                  All
                </MenuItem>

                <MenuItem
                  selected={tabValue === "completed"}
                  onClick={() => setTabValue("completed")}
                  sx={{ minWidth: 160 }}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  Completed
                </MenuItem>

                <MenuItem
                  selected={tabValue === "incomplete"}
                  onClick={() => setTabValue("incomplete")}
                  sx={{ minWidth: 160 }}
                >
                  <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
                  InComplete
                </MenuItem>
              </ToggleButtonGroup>
            </Box>
          )}

          <Box
            sx={{
              display: isMobile ? "flex" : "none",
              flexGrow: 1,
              justifyContent: "end",
            }}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: 1,
            }}
          >
            <SortMenu title={showAddCta ? "Sort By" : ""} />

            {showAddCta && (
              <Button
                variant="contained"
                color="primary"
                aria-label="add"
                onClick={() => openModal("add")}
                startIcon={<AddIcon />}
              >
                Add Task
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Menu
          variant="menu"
          anchorEl={mobileMenuAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              style: {
                width: 200,
              },
            },
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem
            selected={tabValue === "all"}
            onClick={() => {
              setTabValue("all");
              handleMobileMenuClose();
            }}
          >
            <ListIcon sx={{ mr: 1 }} />
            All Tasks
          </MenuItem>
          <MenuItem
            selected={tabValue === "completed"}
            onClick={() => {
              setTabValue("completed");
              handleMobileMenuClose();
            }}
          >
            <CheckCircleIcon sx={{ mr: 1 }} />
            Completed Tasks
          </MenuItem>
          <MenuItem
            divider
            selected={tabValue === "incomplete"}
            onClick={() => {
              setTabValue("incomplete");
              handleMobileMenuClose();
            }}
          >
            <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
            InComplete Tasks
          </MenuItem>

          {!showAddCta && (
            <MenuItem
              aria-label="add"
              onClick={() => {
                handleMobileMenuClose();
                openModal("add");
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add Task
            </MenuItem>
          )}
        </Menu>
      )}
    </>
  );
};

export default Header;
