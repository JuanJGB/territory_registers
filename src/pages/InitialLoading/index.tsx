import { Container, Logo } from "./styles";

type Props = {
  isVisible: boolean;
};

export default function InitialLoading({ isVisible }: Props) {
  return (
    <Container isVisible={isVisible}>
      <>
        <Logo />
        <p>Registros de territórios</p>
      </>
    </Container>
  );
}
