import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Alert from "@mui/material/Alert/Alert";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import RegisterFormFields, { RegisterConfig } from "./RegisterFormFields";
import { db } from "../../../db";
import { ModalBox } from "../styles";
import { Register } from "../types";
import ActionConfirmDialog from "../components/ActionConfirmDialog";

type Props = {
  handleClose: () => void;
  isOpen: boolean;
  register?: Register;
  getCurrentTerritory?: () => number;
  getCurrentQuarter?: () => number;
  onEndEdition?: () => void;
};

const initialConfig = {
  residence: { colors: [] },
  visit: { date: new Date(), moment: 1 },
  situation: "notAtHome",
  finalized: false,
  withoutNumber: false,
  idQuarter: 1,
  idTerritory: 1,
} as RegisterConfig;

export default function RegisterModal({
  isOpen,
  handleClose,
  register,
  onEndEdition,
  getCurrentTerritory,
  getCurrentQuarter,
}: Props) {
  const [registerConfig, setRegisterConfig] =
    useState<RegisterConfig>(initialConfig);
  const [errorMessage, setErrorMessage] = useState("");
  const [cancelEditionDialogIsOpen, setCancelEditionDialogIsOpen] =
    useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (register) {
      const { residence } = register;
      setRegisterConfig({
        ...register,
        withoutNumber: !residence.number || residence.number === "0",
      });
    }
  }, [register]);

  function closeModal() {
    setRegisterConfig(initialConfig);
    handleClose();
  }

  function save() {
    if (register) {
      if (onEndEdition) onEndEdition();
      window.setTimeout(() => {
        db.registers
          .update(register.id!, { ...registerConfig })
          .then(closeModal);
      }, 600);
    } else {
      db.registers
        .add({
          ...registerConfig,
          idQuarter: getCurrentQuarter ? getCurrentQuarter() : 1,
          idTerritory: getCurrentTerritory ? getCurrentTerritory() : 1,
        })
        .then(closeModal);
    }
  }

  function closeErrorAlert() {
    setErrorMessage("");
  }

  function openCancelEditionDialog() {
    if (registerHasChanges(register || initialConfig, registerConfig))
      setCancelEditionDialogIsOpen(true);
    else closeModal();
  }

  function registerHasChanges(
    initialRegister: Register | RegisterConfig,
    changedRegister: RegisterConfig
  ) {
    return (
      changedRegister.residence.colors !== initialRegister.residence.colors ||
      changedRegister.residence.number !== initialRegister.residence.number ||
      changedRegister.observation !== initialRegister.observation ||
      changedRegister.situation !== initialRegister.situation ||
      changedRegister.withoutNumber
    );
  }

  function cancelEdition() {
    setCancelEditionDialogIsOpen(false);
    closeModal();
  }

  return (
    <Modal
      open={isOpen}
      onClose={openCancelEditionDialog}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={5000}
          onClose={closeErrorAlert}
        >
          <Alert
            onClose={closeErrorAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        <ActionConfirmDialog
          title={
            <Box sx={{ width: "100%", textAlign: "center" }}>Atenção!</Box>
          }
          children={
            <>
              Há informações sendo {register ? "editadas" : "cadastradas"}.
              <br /> Deseja mesmo cancelar?
            </>
          }
          isOpen={cancelEditionDialogIsOpen}
          handleCancel={() => setCancelEditionDialogIsOpen(false)}
          handleConfirm={cancelEdition}
        />
        <h2
          id="parent-modal-title"
          style={{
            color: theme.palette.secondary.dark,
            margin: "23px 0 17px 0",
            textAlign: "center",
          }}
        >
          Cadastro de registro
        </h2>
        <Divider sx={{ margin: "7px" }} />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { margin: "5px", width: "15ch" },
          }}
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            if (
              registerConfig?.residence.number === "0" ||
              registerConfig?.residence.number === "00"
            ) {
              setErrorMessage("O número não pode ser 0 nem 00!");
              return;
            }
            save();
          }}
        >
          <RegisterFormFields
            register={registerConfig}
            onChange={(key, value) =>
              setRegisterConfig({ ...registerConfig, [key]: value })
            }
          />
          <Divider sx={{ margin: "10px" }} />
          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button
              variant="contained"
              color="error"
              sx={{
                color: "white",
                borderRadius: "12px",
                textTransform: "none",
                opacity: 0.8,
              }}
              onClick={openCancelEditionDialog}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: "12px", textTransform: "none" }}
              type="submit"
            >
              Salvar
            </Button>
          </Stack>
        </Box>
      </ModalBox>
    </Modal>
  );
}
