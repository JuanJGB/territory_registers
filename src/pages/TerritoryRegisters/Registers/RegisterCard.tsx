import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Register } from "../types";
import RegisterCardInfo from "./RegisterCardInfo";
import RegisterCardActions from "./RegisterCardActions";

type Props = {
  register: Register;
};

export default function RegisterCard({ register }: Props) {
  const [cardActionsIsOpen, setCardActionsIsOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  function openActions() {
    setCardActionsIsOpen(true);
  }

  useEffect(() => {
    setCardActionsIsOpen(false);
  }, [register]);

  useEffect(() => {
    if (cardActionsIsOpen) {
      setBackgroundColor("#F9F9F9");
    } else {
      setBackgroundColor("");
    }
  }, [cardActionsIsOpen]);

  return (
    <Card
      variant="outlined"
      sx={{
        transition: "background 0.3s",
        padding: "1px 25px 1px 25px",
        borderRadius: "10px",
        boxShadow: "-4px 8px 20px rgba(0, 0, 0, 0.17)",
        width: "75vw",
        maxWidth: "400px",
        background: backgroundColor,
        minHeight: "102px",
      }}
    >
      {cardActionsIsOpen ? (
        <RegisterCardActions
          setBackgroundColor={setBackgroundColor}
          register={register}
          closeActions={() => setCardActionsIsOpen(false)}
        />
      ) : (
        <RegisterCardInfo register={register} openCardActions={openActions} />
      )}
    </Card>
  );
}
