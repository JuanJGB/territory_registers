import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ptBR from "dayjs/locale/pt-br";
import { FilterFormControl } from "./style";
import { Register } from "../types";
import { RoundedSelect, RoundedTextField } from "../RegisterModal/styles";
import { ModalBox } from "../styles";
import { db } from "../../../db";

type Props = {
  handleClose: () => void;
  isOpen: boolean;
  setFilteredRegisters: (registers: Register[]) => void;
};

type Order = "visit.date" | "number" | "situation" | "visit.moment";

export default function FiltersModal({
  isOpen,
  handleClose,
  setFilteredRegisters,
}: Props) {
  const theme = useTheme();
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [situation, setSituation] = useState<Register["situation"] | null>();
  const [order, setOrder] = useState<Order | null>();

  function filterRegisters() {
    if (!(visitDate || order || situation)) {
      db.registers.toArray().then((filteredRegisters) => {
        setFilteredRegisters(filteredRegisters);
        handleClose();
      });
    } else {
      db.registers
        .filter(
          (register: Register) =>
            (visitDate
              ? visitDate.toLocaleDateString() ===
                register.visit.date.toLocaleDateString()
              : true) && (situation ? register.situation === situation : true)
        )
        .sortBy(order || "")
        .then((filteredRegisters) => {
          setFilteredRegisters(filteredRegisters);
          handleClose();
        });
    }
  }

  function clearFields() {
    setVisitDate(null);
    setOrder(null);
    setSituation(null);
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox sx={{ width: "240px" }}>
        <Stack spacing={17} direction="row">
          <h2
            id="parent-modal-title"
            style={{
              color: theme.palette.primary.main,
              margin: "19px 0 12px 1px",
            }}
          >
            Filtros
          </h2>
          <IconButton
            color="primary"
            sx={{ marginTop: "5px !important" }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Stack>
        <Divider />
        <Box
          sx={{
            padding: "10px 5px 4px 5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FilterFormControl>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={ptBR}
            >
              <DatePicker
                disableFuture
                label="Data visita"
                openTo="day"
                inputFormat="DD/MM/YYYY"
                views={["year", "month", "day"]}
                value={visitDate}
                onChange={(newValue: any) =>
                  setVisitDate(newValue?.$d || new Date())
                }
                renderInput={(params) => (
                  <RoundedTextField sx={{ width: "180px" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </FilterFormControl>
          <FilterFormControl>
            <InputLabel id="demo-simple-select-label">Situação</InputLabel>
            <RoundedSelect
              sx={{ paddingLeft: "8px", marginLeft: 0 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={situation}
              required
              label="Situação"
              onChange={(event) =>
                setSituation(event.target.value as Register["situation"])
              }
            >
              <MenuItem value={"notAtHome"}>Não em casa</MenuItem>
              <MenuItem value={"busy"}>Ocupado</MenuItem>
            </RoundedSelect>
          </FilterFormControl>
          <FilterFormControl>
            <InputLabel id="demo-simple-select-label">Ordenar</InputLabel>
            <RoundedSelect
              sx={{ paddingLeft: "8px", marginLeft: 0 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={order}
              required
              label="Ordenar"
              onChange={(event) => setOrder(event.target.value as Order)}
            >
              <MenuItem value={"visit.date"}>Data visita</MenuItem>
              <MenuItem value={"number"}>Número</MenuItem>
              <MenuItem value={"situation"}>Situação</MenuItem>
              <MenuItem value={"visit.moment"}>Momento visita</MenuItem>
            </RoundedSelect>
          </FilterFormControl>
        </Box>
        <Divider />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "14px",
          }}
        >
          <Button
            variant="contained"
            color="info"
            sx={{
              width: "80%",
              borderRadius: "12px",
            }}
            onClick={clearFields}
          >
            Limpar
          </Button>
          <Button
            variant="contained"
            sx={{
              color: theme.palette.secondary.light,
              width: "80%",
              borderRadius: "12px",
              marginLeft: "10px",
            }}
            onClick={filterRegisters}
          >
            Confirmar
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
}
