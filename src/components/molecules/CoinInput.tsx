import styled from "@emotion/styled";
import { CoinSelect, Pill } from "../atoms";
import { ICoin } from "@/models";
import { ChangeEvent, useState } from "react";

const Container = styled.div`
  display: flex;
  background-color: #101010;
  padding: 0.875rem 1.125rem;
  gap: 1rem;
  border-radius: 1.5rem;
`;

const InputInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoinInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const CoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.25rem;
  align-items: self-end;
`;

const USDCEstimate = styled.span`
  font-weight: 450;
  font-size: 0.8125em;
  line-height: 1.5em;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #7185aa;
`;

const ActionText = styled.span`
  font-weight: 450;
  font-size: 0.875em;
  line-height: 1.5em;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #7185aa;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  font-weight: 500;
  font-size: 1.5em;
  line-height: 2.625em;

  &:active {
    border: none;
  }
`;

interface IProps {
  variant: "sell" | "buy";
  coins: ICoin[];
}

export const CoinInput = ({ variant, coins }: IProps) => {
  const [amount, setAmount] = useState<{ value: number; usdcEstimate: number }>(
    { value: 0, usdcEstimate: 0 }
  );

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(value) || parseFloat(value)) {
      setAmount((prevState) => ({ ...prevState, value: parseFloat(value) }));
    }
    if (value === "") {
      setAmount((prevState) => ({ ...prevState, value: 0, usdcEstimate: 0 }));
    }
  };

  const onCoinChange = (address: string) => {
    console.log({ address });
  };

  return (
    <Container>
      <InputInfoContainer>
        <USDCEstimate>~$1,200,30</USDCEstimate>
        <Input value={amount.value} onChange={onChange} />
      </InputInfoContainer>
      <CoinInfoContainer>
        <Pill text="min" />
        <CoinContainer>
          <ActionText>{variant === "buy" ? "You buy" : "You sell"}</ActionText>
          <CoinSelect onSelect={onCoinChange} coins={coins} />
        </CoinContainer>
      </CoinInfoContainer>
    </Container>
  );
};
