import Checkbox from "@mui/material/Checkbox";
// import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import {
  FieldsContainer,
  //  RoundedSelect,
  RoundedTextField,
} from "./styles";
import { Register } from "../types";
import MultipleColors from "../components/MultipleColors";
import ObservationField from "../components/fields/Observation";
import SituationField from "../components/fields/Situation";

export type RegisterConfig = Omit<
  Register & { withoutNumber: boolean },
  "block" | "id"
>;

type Props = {
  register: RegisterConfig;
  onChange: <Key extends keyof RegisterConfig>(
    key: Key,
    value: RegisterConfig[Key]
  ) => void;
};

export default function RegisterFormFields({
  register: { situation, visit, residence, observation, withoutNumber },
  onChange,
}: Props) {
  const { number, colors } = residence;

  return (
    <>
      <FieldsContainer>
        <RoundedTextField
          required={!withoutNumber}
          disabled={withoutNumber}
          id="outlined-basic"
          label="Número"
          variant="outlined"
          margin="dense"
          value={number}
          onChange={(event) => {
            const { value } = event.target;
            onChange("residence", {
              ...residence,
              number: /^[0-9]+$/.test(value) ? value : value.replace(/\D/g, ""),
            });
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <HomeIcon sx={{ opacity: 0.5 }} />
              </InputAdornment>
            ),
          }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 7 }}
        />
        <FormControlLabel
          disabled={!!number}
          sx={
            withoutNumber
              ? { color: "var(--primary)" }
              : {
                  "& span": {
                    color: "rgba(0, 0, 0, 0.6)",
                  },
                }
          }
          onChange={(_, checked) => onChange("withoutNumber", checked)}
          control={
            <Checkbox
              checked={withoutNumber}
              icon={<CircleOutlinedIcon sx={{ opacity: 0.8 }} />}
              checkedIcon={<CircleIcon sx={{ color: "var(--primary)" }} />}
            />
          }
          label="Sem número"
        />
      </FieldsContainer>
      {/* <FieldsContainer>
        <FormControl sx={{ margin: "8px" }}>
          <InputLabel id="demo-simple-select-label">Visita</InputLabel>
          <RoundedSelect
            sx={{ paddingLeft: "8px", marginLeft: 0 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={visit.moment}
            disabled
            required
            label="Visita"
            onChange={(event) =>
              onChange("visit", {
                ...visit,
                moment: event.target.value as Register["visit"]["moment"],
              })
            }
          >
            <MenuItem value={1}>1ª</MenuItem>
            <MenuItem value={2}>2ª</MenuItem>
            <MenuItem value={3}>3ª</MenuItem>
          </RoundedSelect>
        </FormControl>
      </FieldsContainer> */}
      <FieldsContainer>
        <MultipleColors
          colors={colors}
          onChange={(newValue) =>
            onChange("residence", {
              ...residence,
              colors: newValue.length > 2 ? newValue.slice(0, 2) : newValue,
            })
          }
        />
        <SituationField
          value={situation}
          onChange={(value) => onChange("situation", value)}
        />
      </FieldsContainer>
      <FieldsContainer>
        <ObservationField
          required={withoutNumber}
          value={observation}
          onChange={(value) => onChange("observation", value)}
        />
      </FieldsContainer>
    </>
  );
}
