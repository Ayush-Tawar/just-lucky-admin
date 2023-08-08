import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";
import Iconify from "../Iconify";
import MenuPopover from "../MenuPopover";
import { useRef, useState } from "react";
// component

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

ListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  selectedFilterOption: PropTypes.object,
  onFilterName: PropTypes.func,
  onChangeFilterOption: PropTypes.func,
  filterOptions: PropTypes.array,
};

export default function ListToolbar({
  numSelected,
  filterName,
  onFilterName,
  selectedFilterOption,
  onChangeFilterOption,
  filterOptions,
}) {
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const anchorRef = useRef();
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton ref={anchorRef} onClick={() => setOpenFilterMenu(true)}>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
      <MenuPopover
        open={openFilterMenu}
        onClose={() => setOpenFilterMenu(false)}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Stack spacing={0.75}>
          {filterOptions.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.value == selectedFilterOption.value}
              onClick={() => {
                onChangeFilterOption(option);
                setOpenFilterMenu(false);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </RootStyle>
  );
}
