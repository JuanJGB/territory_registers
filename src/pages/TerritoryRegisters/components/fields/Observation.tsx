import { RoundedTextField } from "../../RegisterModal/styles";

type Props = {
  required: boolean;
  value: string | undefined;
  onChange: (value: string) => void;
};

export default function ObservationField({ required, value, onChange }: Props) {
  return (
    <RoundedTextField
      id="outlined-multiline-static"
      label="Observação"
      required={required}
      multiline
      value={value}
      sx={{ width: "100% !important" }}
      onChange={(event) => onChange(event.target.value)}
      rows={2}
      inputProps={{ maxLength: 70 }}
    />
  );
}
