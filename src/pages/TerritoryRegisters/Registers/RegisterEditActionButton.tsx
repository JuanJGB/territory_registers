import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import RegisterModal from "../RegisterModal";
import { Register } from "../types";
import { ActionButton, ActionButtonIconBox } from "./styles";

type Props = { register: Register; onEndEdition: () => void };

export default function RegisterEditActionButton({
  register,
  onEndEdition,
}: Props) {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  return (
    <>
      {registerModalIsOpen ? (
        <RegisterModal
          isOpen={registerModalIsOpen}
          register={register}
          onEndEdition={onEndEdition}
          handleClose={() => {
            setRegisterModalIsOpen(false);
          }}
        />
      ) : null}
      <ActionButton
        color="info"
        startIcon={
          <ActionButtonIconBox>
            <EditOutlinedIcon />
          </ActionButtonIconBox>
        }
        sx={
          register.visit.moment < 3
            ? { marginLeft: "-2px !important" }
            : undefined
        }
        onClick={() =>
          window.setTimeout(() => setRegisterModalIsOpen(true), 100)
        }
      >
        Editar
      </ActionButton>
    </>
  );
}
