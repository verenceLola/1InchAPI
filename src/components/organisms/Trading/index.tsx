import { Divider } from "@/components/atoms";
import { CoinInput } from "@/components/molecules";
import { ICoin } from "@/models";
import styled from "@emotion/styled";
import { ChangeEvent, useId, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.625rem 1.875rem 1.875rem;
  gap: 1.375rem;
  background: radial-gradient(
    90.16% 143.01% at 15.32% 21.04%,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(4, 4, 4, 0) 100%
  );
  backdrop-filter: blur(1.25rem);
  border-radius: 1.875rem;

  //   height: 556px;
`;

const QuickTradeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const QuickTradeButton = styled.button`
  padding: 0.5rem 1.8125rem;
  background: #101010;
  text-transform: capitalize;
  color: #637488;
  border: 1.5px solid #1d2a43;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const QUICK_TRADE_OPTIONS = [0.25, 0.5, 0.75, 1];

interface IProps {
  coins: ICoin[];
}

interface ITradeState {
  buy: {
    address: string;
    value: number;
    usdcEstimate: number;
  };
  sell: {
    address: string;
    value: number;
    usdcEstimate: number;
  };
}

export const TradingComponent = ({ coins }: IProps) => {
  const [trade, setTrade] = useState<ITradeState>({
    buy: {
      value: 0,
      usdcEstimate: 0,
      address: coins?.[0].address,
    },
    sell: {
      value: 0,
      usdcEstimate: 0,
      address: coins?.[1].address,
    },
  });

  const onChange = (
    { target: { value } }: ChangeEvent<HTMLInputElement>,
    action: "buy" | "sell"
  ) => {
    if (Number.isInteger(value) || parseFloat(value)) {
      setTrade((prevState) => ({
        ...prevState,
        [action]: { ...prevState[action], value: parseFloat(value) },
      }));
    }
    if (value === "") {
      setTrade((prevState) => ({
        ...prevState,
        [action]: {
          ...prevState[action],
          value: parseFloat(value),
          usdcEstimate: 0,
        },
      }));
    }
  };

  const onCoinChange = (newAddress: string, action: "sell" | "buy") => {
    setTrade((prevState) => ({
      ...prevState,
      [action]: { ...prevState[action], address: newAddress },
    }));
  };

  const onSwap = () => {
    setTrade((prevState) => ({
      ...prevState,
      buy: prevState?.sell,
      sell: prevState?.buy,
    }));
  };

  return (
    <Container>
      <CoinInput
        onChange={onChange}
        amount={trade.buy}
        coins={coins}
        variant="buy"
        onCoinChange={onCoinChange}
      />
      <Divider onClick={onSwap} />
      <CoinInput
        onChange={onChange}
        amount={trade.sell}
        coins={coins}
        variant="sell"
        onCoinChange={onCoinChange}
      />
      <QuickTradeContainer>
        {QUICK_TRADE_OPTIONS.map((option, index) => (
          <QuickTradeButton key={index}>{option * 100}%</QuickTradeButton>
        ))}
      </QuickTradeContainer>
    </Container>
  );
};
