import { TradingComponent } from "@/components/organisms";
import styled from "@emotion/styled";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
  position: relative;
`;

export default function Home() {
  return (
    <Container>
      <TradingComponent />
    </Container>
  );
}
