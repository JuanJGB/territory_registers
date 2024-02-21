import styledMUI from "@mui/material/styles/styled";
import { TypographyProps } from "@mui/material/Typography";
import { TypographyDiv } from "../styles";

type Props = {
  type: "finalization" | "edition" | "deletion";
};

const TypographyAction = styledMUI((props: TypographyProps<"div">) => (
  <TypographyDiv {...props} />
))(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  minHeight: "140px",
}));

export default function RegisterCardCompletedAction({ type }: Props) {
  switch (type) {
    case "finalization":
      return <TypographyAction>Finalizado</TypographyAction>;
    case "edition":
      return <TypographyAction>Alterações salvas</TypographyAction>;
    case "deletion":
      return <TypographyAction>Excluido</TypographyAction>;
  }
}
