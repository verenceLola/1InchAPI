import { CoinSelect, SwapButton } from "@/components/atoms";
import { ICoin } from "@/models";
import styled from "@emotion/styled";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
`;

const coins: ICoin[] = [
  {
    address: "cool",
    logoUrl:
      "https://tokens.1inch.io/0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd.png",
    name: "PieDAO BTC++",
    symbol: "BTC++",
  },
  {
    symbol: "MATH",
    name: "MATH Token",
    address: "0x08d967bb0134f2d07f7cfb6e246680c53927dd30",
    logoUrl:
      "https://tokens.1inch.io/0x08d967bb0134f2d07f7cfb6e246680c53927dd30.png",
  },
  {
    symbol: "STAKE",
    name: "STAKE",
    address: "0x0ae055097c6d159879521c384f1d2123d1f195e6",

    logoUrl:
      "https://tokens.1inch.io/0x0ae055097c6d159879521c384f1d2123d1f195e6.png",
  },
  {
    symbol: "TRB",
    address: "0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0",
    name: "Tellor Tributes",
    logoUrl:
      "https://tokens.1inch.io/0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5.png",
  },
];

export default function Home() {
  return (
    <Container>
      <CoinSelect coins={coins} />
      <SwapButton onClick={console.log} />
    </Container>
  );
}
