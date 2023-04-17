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
  width: 100%;
  justify-content: space-between;
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
  max-width: 200px;

  &:active {
    border: none;
  }
`;

interface IProps {
  variant: "sell" | "buy";
  coins: ICoin[];
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    variant: "sell" | "buy"
  ) => void;
  amount: { value: number; usdcEstimate: number; address: string };
  onCoinChange: (address: string, action: "buy" | "sell") => void;
}

export const CoinInput = ({
  variant,
  coins,
  onChange,
  amount,
  onCoinChange,
}: IProps) => {
  return (
    <Container>
      <InputInfoContainer>
        <USDCEstimate>~$ {amount.usdcEstimate}</USDCEstimate>
        <Input
          readOnly={variant === "sell"}
          value={amount.value}
          onChange={(event) => onChange(event, variant)}
        />
      </InputInfoContainer>
      <CoinInfoContainer>
        {variant === "buy" && <Pill text="min" />}
        <CoinContainer>
          <ActionText>{variant === "buy" ? "You buy" : "You sell"}</ActionText>
          <CoinSelect
            selectedCoin={amount.address}
            onSelect={(address) => onCoinChange(address, variant)}
            coins={coins}
          />
        </CoinContainer>
      </CoinInfoContainer>
    </Container>
  );
};
