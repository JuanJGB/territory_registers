import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getSituationDescription } from "../helpers/situationDescription";
import { TypographyDiv } from "../styles";
import { Register } from "../types";
import RegisterObservation from "./RegisterObservation";
import { CardDivider } from "./styles";
import { Color, ColorsContainer } from "../components/MultipleColors/styles";

type Props = {
  register: Register;
  openCardActions: () => void;
};

export default function RegisterCardInfo({ register, openCardActions }: Props) {
  return (
    <>
      <CardHeader
        sx={{ padding: "16px 6px 4px 6px !important" }}
        title={
          <Grid container spacing={2} justifyContent="space-between">
            <Grid
              item
              display="flex"
              alignItems="center"
              justifyContent="left"
              flex="1"
            >
              <Box
                sx={{
                  width: "125px",
                  height: "28px",
                  background: "#141827",
                  borderRadius: "13px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TypographyDiv
                  sx={{
                    borderRadius: "13px",
                    width: "47%",
                    height: "107%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: "21.5px",
                    marginLeft: "-1px",
                    background:
                      "linear-gradient(180deg, #FF916D 0%, #FF916D 99.99%, rgba(255, 145, 109, 0) 100%)",
                  }}
                >
                  Nº
                </TypographyDiv>
                <TypographyDiv
                  sx={{
                    width: "53%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflowX: "scroll",
                    lineHeight: "21.5px",
                    padding: "0 3px",
                  }}
                >
                  {register.residence.number || "S/N"}
                </TypographyDiv>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                paddingLeft: "12px !important",
              }}
            >
              <TypographyDiv sx={{ marginTop: "2px" }}>
                {register.visit.date.toLocaleDateString()}
              </TypographyDiv>
              <Box
                sx={{
                  display: "flex",
                  border: "1px solid",
                  borderRadius: "20px",
                  opacity: 0.5,
                  padding: "2px",
                  "&:hover": {
                    background: "#bbbbbb",
                  },
                }}
                onClick={openCardActions}
              >
                <MoreVertIcon />
              </Box>
            </Grid>
          </Grid>
        }
      />
      <CardDivider />
      <CardContent sx={{ padding: "5px 8px 6px 8px !important" }}>
        <Grid container spacing={2} direction="column" paddingTop="10px">
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              whiteSpace: "nowrap",
              padding: "7px 0 0 10px !important",
            }}
          >
            <TypographyDiv>
              {register.residence.colors.length > 0 ? (
                <ColorsContainer>
                  {register.residence.colors.slice(0, 2).map((color, index) => (
                    <Color key={index} color={color} />
                  ))}
                </ColorsContainer>
              ) : (
                "Sem cor"
              )}
            </TypographyDiv>
            <TypographyDiv>
              {getSituationDescription(register.situation)}
            </TypographyDiv>
          </Grid>
          {register.observation && (
            <Grid item sx={{ padding: "7px 0 2px 10px !important" }}>
              <RegisterObservation observation={register.observation} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </>
  );
}
