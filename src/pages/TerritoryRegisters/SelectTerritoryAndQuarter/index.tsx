import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db } from "../../../db";
import {
  BallonPopover,
  CurrentTerritoryOrQuarter,
  PopoverBallonPoint,
  PopoverContainer,
  PopoverOption,
} from "./styles";
import { territoriesAndQuarters } from "./territoryAndQuarters";

type Props = {
  getCurrentTerritory: () => number;
  getCurrentQuarter: () => number;
  setCurrentTerritory: (value: number) => void;
  setCurrentQuarter: (value: number) => void;
};

export default function SelectTerritoryAndQuarter({
  getCurrentTerritory,
  getCurrentQuarter,
  setCurrentTerritory,
  setCurrentQuarter,
}: Props) {
  const [territoriesAnchorEl, setTerritoriesAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [quartersAnchorEl, setQuartersAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const currentTerritory = getCurrentTerritory();
  const currentQuarter = getCurrentQuarter();
  const registers = useLiveQuery(() => db.registers.toArray());

  function openQuartersPopover(event: React.MouseEvent<HTMLButtonElement>) {
    setQuartersAnchorEl(event.currentTarget);
  }

  function openTerritoriesPopover(event: React.MouseEvent<HTMLButtonElement>) {
    setTerritoriesAnchorEl(event.currentTarget);
  }

  function closeTerritoriesPopover() {
    setTerritoriesAnchorEl(null);
  }

  function closeQuartersPopover() {
    setQuartersAnchorEl(null);
  }

  const territoriesPopoverIsOpen = Boolean(territoriesAnchorEl);
  const quartersPopoverIsOpen = Boolean(quartersAnchorEl);
  const territoriesAriaId = territoriesPopoverIsOpen
    ? "simple-popover"
    : undefined;
  const quartersAriaId = quartersPopoverIsOpen ? "simple-popover" : undefined;
  const territoryQuarters =
    territoriesAndQuarters.find(({ id }) => id === currentTerritory)
      ?.quarters || [];

  function quarterHasRegisters(idQuarter: number) {
    if (!registers) return false;
    const quarterRegisters = registers.filter(
      (register) =>
        register.idQuarter === idQuarter &&
        register.idTerritory === currentTerritory
    );
    return quarterRegisters.length > 0;
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={6}
        width="100%"
        justifyContent="center"
        marginBottom="5px"
      >
        <Button
          aria-describedby={territoriesAriaId}
          variant="contained"
          onClick={openTerritoriesPopover}
          sx={{
            textTransform: "none",
            borderRadius: "18px",
            padding: "7px 14px",
            width: "130px",
            display: "flex",
            justifyContent: "space-between",
            "&:hover": {
              background: "#ed815f",
            },
          }}
        >
          <Box>Território</Box>
          <CurrentTerritoryOrQuarter
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.light,
            }}
          >
            {getCurrentTerritory()}
          </CurrentTerritoryOrQuarter>
        </Button>
        <Button
          aria-describedby={quartersAriaId}
          variant="outlined"
          onClick={openQuartersPopover}
          sx={{
            textTransform: "none",
            borderRadius: "18px",
            padding: "7px 14px",
            width: "120px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box>Quadra</Box>
          <CurrentTerritoryOrQuarter
            sx={{
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            {currentQuarter}
          </CurrentTerritoryOrQuarter>
        </Button>
      </Stack>
      <BallonPopover
        itenslength={territoriesAndQuarters.length}
        id={territoriesAriaId}
        open={territoriesPopoverIsOpen}
        anchorEl={territoriesAnchorEl}
        onClose={closeTerritoriesPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <PopoverBallonPoint left="72px" />
        <PopoverContainer>
          {territoriesAndQuarters.map(({ id: option }) => (
            <PopoverOption
              key={option}
              selected={option === currentTerritory}
              onClick={() => {
                setCurrentTerritory(option);
                setCurrentQuarter(1);
                window.setTimeout(() => closeTerritoriesPopover(), 30);
              }}
            >
              {option}
            </PopoverOption>
          ))}
        </PopoverContainer>
      </BallonPopover>
      <BallonPopover
        itenslength={territoryQuarters.length}
        id={quartersAriaId}
        open={quartersPopoverIsOpen}
        anchorEl={quartersAnchorEl}
        onClose={closeQuartersPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <PopoverBallonPoint right="67px" />
        <PopoverContainer>
          {territoryQuarters.map((option) => (
            <PopoverOption
              key={option}
              selected={option === currentQuarter}
              sx={
                option !== currentQuarter && quarterHasRegisters(option)
                  ? { background: "#fff388" }
                  : undefined
              }
              onClick={() => {
                setCurrentQuarter(option);
                window.setTimeout(() => closeQuartersPopover(), 30);
              }}
            >
              {option}
            </PopoverOption>
          ))}
        </PopoverContainer>
      </BallonPopover>
    </>
  );
}
