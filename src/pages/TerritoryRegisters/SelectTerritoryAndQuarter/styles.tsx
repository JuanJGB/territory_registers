import Box, { BoxProps } from "@mui/material/Box";
import Popover, { PopoverProps } from "@mui/material/Popover";
import styledMUI from "@mui/material/styles/styled";

export const PopoverOption = styledMUI(
  (props: BoxProps & { selected: boolean }) => <Box {...props} />
)(({ selected }) => ({
  border: "1px solid gray",
  padding: "3px 0",
  margin: "2px",
  width: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  fontSize: "17px",
  lineHeight: "30px",
  fontWeight: "500",
  background: selected ? "#ed815f" : "inherited",
  color: selected ? "white" : "inherited",
  "&:hover": {
    background: "#ed815f",
    borderColor: "#ed815f",
    color: "white",
  },
}));

const optionWidthWithPadding = 50;

export const BallonPopover = styledMUI(
  (props: PopoverProps & { itenslength: number }) => <Popover {...props} />
)(({ itenslength }) => ({
  ".MuiPaper-root": {
    borderRadius: "15px !important",
    width:
      itenslength >= 5
        ? "241px !important"
        : `${itenslength * optionWidthWithPadding}px !important`,
    overflow: "unset",
    marginTop: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 4px 12px 10px",
    position: "relative",
  },
}));

export const PopoverContainer = styledMUI((props: BoxProps) => (
  <Box {...props} />
))(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  maxHeight: "210px",
  overflow: "scroll",
  padding: "3.5px 3.5px 0 3.5px",
}));

export const PopoverBallonPoint = styledMUI((props: BoxProps) => (
  <Box {...props} />
))(() => ({
  position: "absolute",
  borderTop: "10px solid #ffffff",
  borderBottom: "10px solid transparent",
  borderLeft: "10px solid #ffffff",
  borderRight: "10px solid transparent",
  width: 0,
  height: 0,
  top: "-9px",
  transform: "rotate(45deg)",
  boxShadow: "-4px -4px 4px -2px rgb(0 0 0 / 19%)",
}));

export const CurrentTerritoryOrQuarter = styledMUI((props: BoxProps) => (
  <Box {...props} />
))(() => ({
  width: "28px",
  height: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
}));
