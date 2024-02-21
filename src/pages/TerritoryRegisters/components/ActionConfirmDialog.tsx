import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  isOpen: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  title: string | JSX.Element;
  children?: JSX.Element;
};

export default function ActionConfirmDialog({
  isOpen,
  handleCancel,
  handleConfirm,
  title,
  children,
}: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      sx={{
        ".MuiPaper-root": { borderRadius: "11px" },
      }}
    >
      <DialogTitle sx={{ paddingBottom: "2px" }}>{title}</DialogTitle>
      {children ? (
        <DialogContent sx={{ marginTop: "13px" }}>{children}</DialogContent>
      ) : null}
      <DialogActions>
        <Button onClick={handleCancel} color="error">
          Não
        </Button>
        <Button onClick={handleConfirm} color="success" autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
