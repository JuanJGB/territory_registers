import FormControl, { FormControlProps } from "@mui/material/FormControl";

export function FilterFormControl(props: FormControlProps) {
  return (
    <FormControl
      {...props}
      sx={{
        ...props.sx,
        display: "flex",
        justifyContent: "space-between",
        margin: "8px",
        width: "180px",
      }}
    >
      {props.children}
    </FormControl>
  );
}
