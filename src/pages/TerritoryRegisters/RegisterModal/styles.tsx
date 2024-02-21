import Box, { BoxProps } from "@mui/material/Box";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export const RoundedTextField = styled(TextField)`
  fieldset {
    border-radius: 13px;
  }
`;

export const RoundedSelect = styled(Select)`
  fieldset {
    border-radius: 13px;
  }
  div {
    min-width: 40px;
  }
`;

export const FieldsContainer = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      ...props.sx,
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    {props.children}
  </Box>
);
