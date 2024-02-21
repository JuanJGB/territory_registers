import Dexie, { Table } from "dexie";
import { Register } from "./pages/TerritoryRegisters/types";

export class MySubClassedDexie extends Dexie {
  registers!: Table<Register>;

  constructor() {
    super("database");
    this.version(1).stores({
      registers: "++id, residence, situation, visit, observatiom, block",
    });
  }
}

export const db = new MySubClassedDexie();
