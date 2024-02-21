import { Register } from "./types";

export const mockedRegisters: Register[] = [
  {
    residence: { number: "100", colors: ["blue"] },
    situation: "notAtHome",
    visit: { date: new Date(), moment: 1 },
    idQuarter: 1,
    idTerritory: 1,
    finalized: false,
  },
  {
    residence: { number: "102", colors: ["green"] },
    situation: "notAtHome",
    visit: { date: new Date(), moment: 1 },
    idQuarter: 2,
    idTerritory: 1,
    finalized: false,
  },
];
