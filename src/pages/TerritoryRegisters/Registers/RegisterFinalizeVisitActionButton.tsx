import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { Register, RegisterAction } from "../types";
import ActionConfirmDialog from "../components/ActionConfirmDialog";
import { ActionButton, ActionButtonIconBox } from "./styles";

type Props = {
  onConfirmVisitFinalization: () => void;
  visitMoment: Register["visit"]["moment"];
};

export default function RegisterFinalizeVisitActionButton({
  onConfirmVisitFinalization,
  visitMoment,
}: Props) {
  const [finalizeConfirmDialogIsOpen, setFinalizeConfirmDialogIsOpen] =
    useState(false);

  function confirmVisitFinalization() {
    setFinalizeConfirmDialogIsOpen(false);
    onConfirmVisitFinalization();
  }

  function getActionConfigFromVisit(): {
    icon: JSX.Element;
    title: string;
    description: string;
  } {
    switch (visitMoment) {
      case 1:
        return {
          icon: <DoneIcon />,
          description: `Iniciar 2ª visita`,
          title: "Deseja iniciar a 2º visita?",
        };
      case 2:
        return {
          icon: <DoneIcon />,
          description: "Iniciar 3ª visita",
          title: "Deseja iniciar a 3º visita?",
        };
      case 3:
        return {
          icon: <DoneAllIcon />,
          description: "Finalizar",
          title: "Deseja finalizar o registro?",
        };
    }
  }

  const actionConfig = getActionConfigFromVisit();

  return (
    <>
      <ActionConfirmDialog
        title={actionConfig.title}
        isOpen={finalizeConfirmDialogIsOpen}
        handleCancel={() => setFinalizeConfirmDialogIsOpen(false)}
        handleConfirm={confirmVisitFinalization}
      />
      <ActionButton
        color="success"
        startIcon={
          <ActionButtonIconBox>{actionConfig.icon}</ActionButtonIconBox>
        }
        onClick={() => setFinalizeConfirmDialogIsOpen(true)}
      >
        {actionConfig.description}
      </ActionButton>
    </>
  );
}
