import styled from "@emotion/styled";
import { ChevronDownIcon, InfoIcon, YellowIcon } from "../atoms/Icons";
import { useQuote } from "@/hooks";

const Container = styled.div`
  display: flex;
  background-color: #101010;
  border-radius: 0.8125rem;
  padding: 0.875rem 1.125rem;
  width: 100%;
  gap: 0.625rem;
  align-items: center;
  justify-content: space-between;
`;

const ConversionRateContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;
`;

const ConversionRate = styled.span`
  font-weight: 450;
  font-size: 0.9375em;
  line-height: 1.1875em;
  color: white;
`;

const DropDownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Balance = styled.span`
  font-weight: 450;
  font-size: 0.9375rem;
  line-height: 1.1875rem;
  color: #637488;
`;

interface IProps {
  from: {
    symbol: string;
    address: string;
  };
  to: {
    symbol: string;
    address: string;
  };
}

export const ConversionInput = ({ from, to, usdcEstimate }: IProps) => {
    const { data: conversion } = useQuote({
        amount: `${1000000}`,
        fromTokenAddress: from.address,
        toTokenAddress: to.address,
      });

  return (
    <Container>
      <ConversionRateContainer>
        <InfoIcon />
        <ConversionRate>
          1 {from.symbol} = {conversion.toTokenAmount} {to.symbol} (${usdcEstimate}){" "}
        </ConversionRate>
      </ConversionRateContainer>
      <DropDownContainer>
        <YellowIcon />
        <Balance>$0</Balance>
        <ChevronDownIcon />
      </DropDownContainer>
    </Container>
  );
};
