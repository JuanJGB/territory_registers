type TerritoryAndQuarters = {
  id: number;
  quarters: number[];
};

const territoriesAmount = 35;
export const territoriesAndQuarters: TerritoryAndQuarters[] = [];
for (let i = 1; i <= territoriesAmount; i++) {
  territoriesAndQuarters.push({
    id: i,
    quarters: makeQuartersFromTerritory(i),
  });
}

function makeQuartersFromTerritory(territoryId: number) {
  switch (territoryId) {
    case 1:
    case 9:
    case 12:
    case 16:
    case 20:
    case 21:
      return makeQuarters(9);
    case 2:
    case 29:
      return makeQuarters(4);
    case 3:
    case 6:
      return makeQuarters(11);
    case 4:
      return makeQuarters(5);
    case 5:
    case 18:
      return makeQuarters(12);
    case 7:
    case 15:
    case 19:
    case 22:
    case 23:
    case 28:
    case 30:
      return makeQuarters(6);
    case 8:
    case 14:
    case 17:
    case 26:
      return makeQuarters(8);
    case 10:
      return makeQuarters(13);
    case 11:
    case 13:
    case 35:
      return makeQuarters(7);
    case 24:
      return makeQuarters(14);
    case 25:
      return makeQuarters(10);
    case 27:
      return makeQuarters(3);
    case 31:
    case 32:
    case 33:
    case 34:
      const defaultForUndefinedAmount = 10;
      return makeQuarters(defaultForUndefinedAmount);
    default:
      return [];
  }
}

function makeQuarters(quartersAmount: number) {
  const quartersOptions = [];
  for (let i = 1; i <= quartersAmount; i++) {
    quartersOptions.push(i);
  }
  return quartersOptions;
}
