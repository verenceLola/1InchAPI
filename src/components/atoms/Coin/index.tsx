import { ICoin } from "@/models";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const CoinLogo = styled.img`
  width: 2rem;
  height: 2rem;
  border: 1px solid #62688f;
  border-radius: 50%;
`;

const CoinSymbol = styled.span`
  font-weight: 700;
  font-size: 0.875em;
  line-height: 1.25em;
  color: #e5e5e5;
`;

interface IProps {
  details: ICoin;
}

export const Coin = ({ details: { symbol, logoUrl } }: IProps) => (
  <Container>
    <CoinLogo src={logoUrl} />
    <CoinSymbol>{symbol}</CoinSymbol>
  </Container>
);
