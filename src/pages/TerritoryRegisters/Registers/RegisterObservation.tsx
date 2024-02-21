import { TypographyDiv } from "../styles";

type Props = {
  observation: string;
};

export default function RegisterObservation({ observation }: Props) {
  return (
    <TypographyDiv sx={{ display: "flex", overflowWrap: "anywhere" }}>
      {observation}
    </TypographyDiv>
  );
}
