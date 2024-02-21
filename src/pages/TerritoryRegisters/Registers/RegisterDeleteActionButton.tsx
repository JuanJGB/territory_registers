import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import ActionConfirmDialog from "../components/ActionConfirmDialog";
import { ActionButton, ActionButtonIconBox } from "./styles";

type Props = {
  onConfirmDeletion: () => void;
};

export default function RegisterDeleteActionButton({
  onConfirmDeletion,
}: Props) {
  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);

  function confirmDeletion() {
    setConfirmDialogIsOpen(false);
    onConfirmDeletion();
  }

  return (
    <>
      <ActionConfirmDialog
        title="Deseja excluir o registro?"
        isOpen={confirmDialogIsOpen}
        handleCancel={() => setConfirmDialogIsOpen(false)}
        handleConfirm={confirmDeletion}
      />
      <ActionButton
        color="error"
        startIcon={
          <ActionButtonIconBox>
            <DeleteOutlineIcon />
          </ActionButtonIconBox>
        }
        onClick={() => setConfirmDialogIsOpen(true)}
      >
        Excluir
      </ActionButton>
    </>
  );
}
