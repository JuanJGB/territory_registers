import Button, { ButtonProps } from "@mui/material/Button";
import Box, { BoxProps } from "@mui/material/Box";
import styledMUI from "@mui/material/styles/styled";
import Divider, { DividerProps } from "@mui/material/Divider";

export const ActionButton = styledMUI((props: ButtonProps) => (
  <Button {...props} />
))(() => ({
  ".MuiTouchRipple-root:first-child": {
    "&:hover": {
      background: "white",
    },
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  borderRadius: "15px",
}));

export const ActionButtonIconBox = styledMUI((props: BoxProps) => (
  <Box {...props} />
))(() => ({
  border: "1px solid",
  borderRadius: "30px",
  padding: "16px",
  display: "flex",
  marginRight: "-12px",
  marginBottom: "7px",
}));

export const CardDivider = styledMUI((props: DividerProps) => (
  <Divider {...props} />
))(() => ({
  border: "0.2px solid #474f535e",
  margin: "5px",
}));
