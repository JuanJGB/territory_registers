export type Register = {
  id?: number;
  residence: {
    number?: string;
    colors: string[];
  };
  situation: "notAtHome" | "busy";
  visit: {
    date: Date;
    moment: 1 | 2 | 3;
  };
  observation?: string;
  finalized: boolean;
  idTerritory: number;
  idQuarter: number;
};

export type RegisterAction =
  | "finalization"
  | "deletion"
  | "second_visit"
  | "third_visit";
