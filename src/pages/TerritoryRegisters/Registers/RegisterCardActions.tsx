import { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import WestIcon from "@mui/icons-material/West";
import Box from "@mui/material/Box";
import { Register } from "../types";
import { db } from "../../../db";
import RegisterCardCompletedAction from "./RegisterCardCompletedAction";
import RegisterEditActionButton from "./RegisterEditActionButton";
import RegisterDeleteActionButton from "./RegisterDeleteActionButton";

type Props = {
  register: Register;
  closeActions: () => void;
  setBackgroundColor: (color: string) => void;
};

export default function RegisterCardActions({
  register,
  closeActions,
  setBackgroundColor,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [completedDeletionMessageIsOpen, setCompletedDeletionMessageIsOpen] =
    useState(false);
  // const [
  //   completedFinalizationMessageIsOpen,
  //   setCompletedFinalizationMessageIsOpen,
  // ] = useState(false);
  const [completedEditionMessageIsOpen, setCompletedEditionMessageIsOpen] =
    useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsOpen(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  // function confirmVisitFinalization() {
  //   switch (register.visit.moment) {
  //     case 1:
  //       break;
  //     case 2:
  //       break;
  //     case 3:
  //       setCompletedFinalizationMessageIsOpen(true);
  //       setBackgroundColor("#55E4AC");
  //       handleAnimation(() => {
  //         db.registers
  //           .update(register.id!, { finalized: true })
  //           .then(() => setBackgroundColor(""));
  //       });
  //   }
  // }

  function confirmDeletion() {
    setCompletedDeletionMessageIsOpen(true);
    setBackgroundColor("#d32f2f");
    handleAnimation(() => {
      db.registers.delete(register.id!).then(() => setBackgroundColor(""));
    });
  }

  function handleAnimation(callback: () => void) {
    window.setTimeout(callback, 600);
  }

  function endEdition() {
    setCompletedEditionMessageIsOpen(true);
    setBackgroundColor("#15aafa");
  }

  // if (completedFinalizationMessageIsOpen)
  //   return <RegisterCardCompletedAction type="finalization" />;
  if (completedDeletionMessageIsOpen)
    return <RegisterCardCompletedAction type="deletion" />;
  if (completedEditionMessageIsOpen)
    return <RegisterCardCompletedAction type="edition" />;
  return isOpen ? (
    <>
      <CardHeader
        sx={{ padding: "10px 10px 0 10px" }}
        title={
          <Button
            startIcon={<WestIcon />}
            sx={{
              marginLeft: "-22px",
              textTransform: "none",
              borderRadius: "15px",
            }}
            onClick={closeActions}
          >
            <Box sx={{ borderBottom: "1px solid" }}>Voltar</Box>
          </Button>
        }
      />
      <CardContent sx={{ padding: 0 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={8}
        >
          {!register.finalized ? (
            <>
              {/* <RegisterFinalizeVisitActionButton
                onConfirmVisitFinalization={confirmVisitFinalization}
                visitMoment={register.visit.moment}
              /> */}
              {register.visit.moment < 3 ? (
                <RegisterEditActionButton
                  register={register}
                  onEndEdition={endEdition}
                />
              ) : null}
            </>
          ) : null}
          <RegisterDeleteActionButton onConfirmDeletion={confirmDeletion} />
        </Stack>
      </CardContent>
    </>
  ) : null;
}
