import { TradingComponent } from "@/components/organisms";
import styled from "@emotion/styled";
import { Suspense } from "react";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
  position: relative;
`;

const Home = () => (
  <Container>
    <Suspense fallback={<div>loading ...</div>}>
      <TradingComponent />
    </Suspense>
  </Container>
);

export default Home;
