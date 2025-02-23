import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { useTodoStore } from "../store/useTodoStore";

const SortMenu: React.FC<{
  title?: string | "Sort By";
}> = ({ title }) => {
  const { sortBy, setSortBy, tabValue } = useTodoStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (
    value: "name-asc" | "name-desc" | "completed-asc" | "completed-desc"
  ) => {
    setSortBy(value);
    handleClose();
  };

  const sortingOptions = [
    { value: "name-asc", label: "Sort by Name (A-Z)" },
    { value: "name-desc", label: "Sort by Name (Z-A)" },
    { value: "completed-asc", label: "Sort by Completed (Incomplete First)" },
    { value: "completed-desc", label: "Sort by Completed (Completed First)" },
  ];

  const filteredOptions = sortingOptions.filter((option) => {
    if (tabValue === "completed") {
      return !option.value.startsWith("completed");
    }
    if (tabValue === "incomplete") {
      return !option.value.startsWith("completed");
    }
    return true;
  });

  return (
    <>
      {title ? (
        <Button
          aria-label="sort"
          variant="outlined"
          onClick={handleClick}
          startIcon={<SortIcon />}
        >
          {title}
        </Button>
      ) : (
        <Button
          color="inherit"
          aria-label="sort"
          onClick={handleClick}
          startIcon={<SortIcon />}
        />
      )}

      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {filteredOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={sortBy === option.value}
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortMenu;
