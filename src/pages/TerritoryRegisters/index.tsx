import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Fab from "@mui/material/Fab";
// import useTheme from "@mui/material/styles/useTheme";
// import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
// import IconButton from "@mui/material/IconButton";
// import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import AddIcon from "@mui/icons-material/Add";
// import FilterListIcon from "@mui/icons-material/FilterList";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import Registers from "./Registers";
import RegisterModal from "./RegisterModal";
import FiltersModal from "./FIltersModal";
import { RegisterTab, Title } from "./styles";
import { db } from "../../db";
import { fabStyle } from "./constants";
import { Register } from "./types";
import ActionConfirmDialog from "./components/ActionConfirmDialog";
import SelectTerritoryAndQuarter from "./SelectTerritoryAndQuarter";

export default function TerritoryRegisters() {
  // const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  // const [currentVisitTab, setCurrentVisitTab] = useState(0);
  const [filteredRegisters, setFilteredRegisters] = useState<Register[]>([]);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [filtersModalIsOpen, setFiltersModalIsOpen] = useState(false);
  const [noteFinalizedIsOpen, setNoteFinalizedIsOpen] = useState(false);
  const [confirmNoteFinalizationIsOpen, setConfirmNoteFinalizationIsOpen] =
    useState(false);
  const [localCurrentQuarter, setLocalCurrentQuarter] = useState(1);
  const [localCurrentTerritory, setLocalCurrentTerritory] = useState(1);
  const registers = useLiveQuery(() => db.registers.toArray());
  const openedRegisters = filteredRegisters.filter(
    ({ finalized }) => !finalized
  );

  useEffect(() => {
    setLocalCurrentQuarter(getCurrentQuarter());
    setLocalCurrentTerritory(getCurrentTerritory());
  }, []);

  useEffect(() => {
    setFilteredRegisters(
      registers?.filter(
        ({ idQuarter, idTerritory }) =>
          idQuarter === localCurrentQuarter &&
          idTerritory === localCurrentTerritory
      ) || []
    );
  }, [registers, localCurrentQuarter, localCurrentTerritory]);
  // const transitionDuration = {
  //   enter: theme.transitions.duration.enteringScreen,
  //   exit: theme.transitions.duration.leavingScreen,
  // };

  function setCurrentQuarter(quarter: number) {
    localStorage.setItem("currentQuarter", quarter.toString());
    setLocalCurrentQuarter(quarter);
  }

  function setCurrentTerritory(territory: number) {
    localStorage.setItem("currentTerritory", territory.toString());
    setLocalCurrentTerritory(territory);
  }

  function getCurrentTerritory() {
    return parseInt(localStorage.getItem("currentTerritory") || "1", 10);
  }
  function getCurrentQuarter() {
    return parseInt(localStorage.getItem("currentQuarter") || "1", 10);
  }

  function finalizeRegistersNote() {
    db.registers
      .where("id")
      .anyOf(filteredRegisters.map(({ id }) => id!))
      .delete()
      .then(() => {
        setConfirmNoteFinalizationIsOpen(false);
        setNoteFinalizedIsOpen(true);
        window.setTimeout(() => {
          setNoteFinalizedIsOpen(false);
        }, 800);
      });
  }

  return (
    <>
      {noteFinalizedIsOpen ? (
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            left: "50%",
            width: "170px",
            top: "45%",
            transform: "translate(-50%, 0)",
          }}
        >
          Anotação concluída!
        </Alert>
      ) : null}

      <RegisterModal
        getCurrentTerritory={getCurrentTerritory}
        getCurrentQuarter={getCurrentQuarter}
        isOpen={registerModalIsOpen}
        handleClose={() => setRegisterModalIsOpen(false)}
      />
      <FiltersModal
        isOpen={filtersModalIsOpen}
        handleClose={() => setFiltersModalIsOpen(false)}
        setFilteredRegisters={setFilteredRegisters}
      />
      <ActionConfirmDialog
        title={<Box sx={{ width: "100%", textAlign: "center" }}>Atenção!</Box>}
        children={
          <Stack>
            <Box>
              Os registros do Território
              <strong>{"\n" + getCurrentTerritory()}</strong>, Quadra
              <strong>{"\n" + getCurrentQuarter()}</strong> serão excluídos
              definitivamente, e não poderão ser recuperados.
            </Box>
            <br />
            <Box>Deseja concluir a anotação de registros?</Box>
          </Stack>
        }
        isOpen={confirmNoteFinalizationIsOpen}
        handleCancel={() => setConfirmNoteFinalizationIsOpen(false)}
        handleConfirm={finalizeRegistersNote}
      />
      <Box
        sx={{
          justifyContent: "center",
          maxHeight: "99.8vh",
          overflowY: "scroll",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          paddingTop="20px"
        >
          <Title>Registros de território</Title>
          {/* <IconButton
            aria-label="filtro"
            size="large"
            sx={{
              margin: "2px 0 0 20px !important",
              color: theme.palette.secondary.dark,
            }}
            onClick={() => setFiltersModalIsOpen(true)}
          >
            <FilterListIcon fontSize="large" />
          </IconButton> */}
        </Stack>
        <Box
          sx={{
            marginBottom: "20px",
            marginTop: "5px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Divider sx={{ maxWidth: "400px", width: "80%" }} />
        </Box>
        <SelectTerritoryAndQuarter
          getCurrentTerritory={getCurrentTerritory}
          getCurrentQuarter={getCurrentQuarter}
          setCurrentTerritory={setCurrentTerritory}
          setCurrentQuarter={setCurrentQuarter}
        />
        <TabContext value={currentTab.toString()}>
          {/* <Box>
            <TabList
              centered
              onChange={(_, newValue: string) =>
                setCurrentTab(Number(newValue))
              }
              aria-label="Aba de registros"
            >
              <RegisterTab label="Em andamento" value="0" />
              <RegisterTab label="Finalizados" value="1" disabled />
            </TabList>
          </Box> */}
          <TabPanel value="0" sx={{ paddingTop: 0 }}>
            {/**"7px" */}
            {/* <TabContext value={currentVisitTab.toString()}> */}
            {/* <Box>
                <TabList
                  centered
                  aria-label="Aba de visitas"
                  onChange={(_, newValue: string) =>
                    setCurrentVisitTab(Number(newValue))
                  }
                >
                  <RegisterTab label="1ª visita" value="0" />
                  <RegisterTab label="2ª visita" value="1" disabled />
                  <RegisterTab label="3ª visita" value="2" disabled />
                </TabList>
              </Box> */}
            <TabPanel value="0">
              <Registers
                registers={openedRegisters.filter(
                  ({ visit }) => visit.moment === 1
                )}
              />
            </TabPanel>
            {/* <TabPanel value="1">
              <Registers
                registers={openedRegisters.filter(
                  ({ visit }) => visit.moment === 2
                )}
              />
            </TabPanel>
            <TabPanel value="2">
              <Registers
                registers={openedRegisters.filter(
                  ({ visit }) => visit.moment === 3
                )}
              />
            </TabPanel> */}
            {/* </TabContext> */}
          </TabPanel>
          {/* <TabPanel value="1">
            <Registers
              registers={filteredRegisters.filter(({ finalized }) => finalized)}
            />
          </TabPanel> */}
        </TabContext>
        {/* <Zoom
        in={currentTab === index}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
        > */}
        <Fab
          color="success"
          sx={{
            ...fabStyle,
            right: "16px",
            backgroundColor: "#55E4AC",
            "&:hover": {
              backgroundColor: "#40c08f",
            },
          }}
          title="Adicionar"
          onClick={() => setRegisterModalIsOpen(true)}
        >
          <AddIcon fontSize="large" />
        </Fab>
        {openedRegisters?.length ? (
          <Fab
            color="info"
            sx={{
              ...fabStyle,
              color: "white",
              right: "90px",
              flexDirection: "column",
              backgroundColor: "#f2d096",
              "&:hover": {
                backgroundColor: "#f2d096",
                opacity: 0.8,
              },
            }}
            title="Concluir anotação"
            onClick={() => setConfirmNoteFinalizationIsOpen(true)}
          >
            <EditIcon fontSize="large" sx={{ marginTop: "1px" }} />
            <DoneAllIcon fontSize="large" sx={{ marginTop: "-14px" }} />
          </Fab>
        ) : null}
        {/* </Zoom> */}
      </Box>
    </>
  );
}
