import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { RoundedSelect } from "../../RegisterModal/styles";
import { Register } from "../../types";

type Props = {
  value: string | undefined;
  onChange: (value: Register["situation"]) => void;
};

export default function SituationField({ value, onChange }: Props) {
  return (
    <FormControl sx={{ margin: "8px 5px", minWidth: "140px" }}>
      <InputLabel id="demo-simple-select-label">Situação</InputLabel>
      <RoundedSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Situação"
        required
        onChange={(event) =>
          onChange(event.target.value as Register["situation"])
        }
      >
        <MenuItem value={"notAtHome"}>Não em casa</MenuItem>
        <MenuItem value={"busy"}>Ocupado</MenuItem>
      </RoundedSelect>
    </FormControl>
  );
}
