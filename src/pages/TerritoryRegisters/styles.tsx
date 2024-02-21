import styledMUI from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Tab, { TabProps } from "@mui/material/Tab";
import { forwardRef } from "react";
import styled from "styled-components";

export const TypographyDiv = (props: TypographyProps<"div">) => (
  <Typography component="div" {...props}>
    {props.children}
  </Typography>
);

export const Title = styled.h2`
  color: #141827;
  margin: 10px 0px;
  /* padding-left: 17px; */
  /* margin-right: 25vw; //3vw */
`;

export const RegisterTab = styledMUI((props: TabProps) => <Tab {...props} />)(
  () => ({
    textTransform: "none",
  })
);

export const ModalBox = forwardRef(({ sx, ...restProps }: BoxProps, ref) => (
  <Box
    ref={ref}
    sx={{
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      width: "80vw",
      maxWidth: "320px",
      maxHeight: "85vh",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      borderRadius: "15px",
      padding: "0 24px 20px 24px",
      outline: "none !important",
      overflow: "scroll",
      ...sx,
    }}
    {...restProps}
  />
));
