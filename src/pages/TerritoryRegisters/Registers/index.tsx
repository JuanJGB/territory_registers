import Box from "@mui/material/Box";
import { Register } from "../types";
import RegisterCard from "./RegisterCard";

type Props = {
  registers: Register[] | undefined;
};

export default function Registers({ registers }: Props) {
  if (!(registers && registers.length))
    return (
      <Box width="100%" display="flex" justifyContent="center">
        Nenhum registro encontrado
      </Box>
    );
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      {registers.map((register, index) => (
        <Box key={index} sx={{ marginBottom: "20px" }}>
          <RegisterCard register={register} />
        </Box>
      ))}
    </Box>
  );
}
