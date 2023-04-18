import { Divider, SwapButton } from "@/components/atoms";
import { RefreshIcon, SettingsIcon } from "@/components/atoms/Icons";
import { CoinInput, ConversionInput } from "@/components/molecules";
import { useGetTokens, useQuote } from "@/hooks";
import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.625rem 1.875rem 1.875rem;
  gap: 1.375rem;
  position: relative;
  border-radius: 1.875rem;
  aspect-ratio: 464/556;
  border: 2px solid transparent;
  background-clip: padding-box;
  background: radial-gradient(
    circle,
    rgba(255, 191, 64, 0.2) 50%,
    rgba(30, 30, 30, 1) 100%
  );

  &::after {
    content: "";
    position: absolute;
    border-radius: 1.875rem;
    isolation: isolate;
    z-index: -1;
    top: -4px;
    bottom: -4px;
    left: -4px;
    right: -4px;
    filter: opacity(0.2);
    background: linear-gradient(135deg, #e5e54b 2.88%, #ef5322 98.14%);
  }
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

const Menu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
  padding-block: 1rem;
`;

const QUICK_TRADE_OPTIONS = [0.25, 0.5, 0.75, 1];

// We can get this from the fetched coins. For simplicity.
const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

interface ITradeState {
  buy: {
    address: string;
    value: number;
    usdcEstimate: number;
    symbol: string;
  };
  sell: {
    address: string;
    value: number;
    usdcEstimate: number;
    symbol: string;
  };
}

export const TradingComponent = () => {
  const { data: coins } = useGetTokens();

  const [trade, setTrade] = useState<ITradeState>({
    buy: {
      value: 0,
      usdcEstimate: 0,
      address: "",
      symbol: "",
    },
    sell: {
      value: 0,
      usdcEstimate: 0,
      address: "",
      symbol: "",
    },
  });

  const { data: buyingQuote } = useQuote({
    amount: `${trade.buy.value}`,
    fromTokenAddress: trade.buy.address,
    toTokenAddress: USDC_ADDRESS,
  });

  const { data: sellingQuote } = useQuote({
    amount: `${trade.sell.value}`,
    fromTokenAddress: trade.sell.address,
    toTokenAddress: USDC_ADDRESS,
  });

  useEffect(() => {
    if (buyingQuote?.toTokenAmount) {
      setTrade((prevState) => ({
        ...prevState,
        buy: {
          ...prevState.buy,
          usdcEstimate: parseInt(buyingQuote.toTokenAmount!),
        },
      }));
    }
  }, [buyingQuote?.toTokenAmount]);

  useEffect(() => {
    if (sellingQuote?.toTokenAmount) {
      setTrade((prevState) => ({
        ...prevState,
        sell: {
          ...prevState.sell,
          usdcEstimate: parseInt(sellingQuote.toTokenAmount!),
        },
      }));
    }
  }, [sellingQuote?.toTokenAmount]);

  useEffect(() => {
    if (coins?.[0] && coins?.[1]) {
      setTrade((prevState) => ({
        ...prevState,
        buy: {
          ...prevState.buy,
          address: coins[0].address,
          symbol: coins[0].symbol,
        },
        sell: {
          ...prevState.buy,
          address: coins[1].address,
          symbol: coins[1].symbol,
        },
      }));
    }
  }, [coins]);

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

  const onRefresh = () => {
    console.log("refreshing");
  };

  const onOpenSettings = () => {
    console.log("opening settings");
  };

  return (
    <Container>
      <Menu>
        <RefreshIcon style={{ cursor: "pointer" }} onClick={onRefresh} />
        <SettingsIcon style={{ cursor: "pointer" }} onClick={onOpenSettings} />
      </Menu>
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
      <ConversionInput
        from={{ symbol: trade.buy.symbol, address: trade.buy.address }}
        to={{ symbol: trade.sell.symbol, address: trade.sell.address }}
      />
      <SwapButton onClick={console.log} />
    </Container>
  );
};
