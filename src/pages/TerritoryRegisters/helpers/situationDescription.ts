import { Register } from "../types";

export function getSituationDescription(situation: Register["situation"]) {
  switch (situation) {
    case "notAtHome":
      return "Não em casa";
    case "busy":
      return "Ocupado";
    default:
      return "Indefinido";
  }
}
