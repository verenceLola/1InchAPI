import styled from "@emotion/styled";
import { ChevronDownIcon } from "../Icons";
import { Coin } from "../Coin";
import { useEffect, useMemo, useState } from "react";
import { ICoin } from "@/models";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  background: #141822;
  border-radius: 1.5rem 0.365rem 0.365rem 1.5rem;
  align-items: center;
  padding: 0.25rem 0.4375rem 0.25rem 0.25rem;
`;

const CoinsList = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  position: absolute;
  top: 45px;
  border-radius: 0.25rem 0.25rem;
  background-color: #141822;
  isolation: isolate;
  z-index: 10;
`;

const CoinItem = styled.div`
  padding: 0.5rem 1rem;

  &:hover {
    cursor: pointer;
    filter: brightness(1.5);
  }

  &:not(:last-child) {
    border-bottom: 1px solid #7185aa;
  }
`;

interface IProps {
  coins: ICoin[];
  onSelect: (address: string) => void;
  selectedCoin: string;
}

export const CoinSelect = ({ coins = [], onSelect, selectedCoin }: IProps) => {
  const [open, setOpen] = useState(false);

  const onOpenDropDown = () => {
    setOpen((prevState) => !prevState);
  };

  const onSelectCoin = (address: string) => {
    onSelect(address);
  };

  return (
    <Container>
      <SelectContainer>
        {selectedCoin && (
          <Coin
            details={
              coins.find((x) => x.address === selectedCoin) ?? coins?.[0]
            }
          />
        )}
        <ChevronDownIcon
          onClick={onOpenDropDown}
          style={{ marginTop: -4, cursor: "pointer" }}
        />
      </SelectContainer>
      <CoinsList open={open}>
        {coins.map((coin) => (
          <CoinItem
            onClick={() => onSelectCoin(coin.address)}
            key={coin.address}
          >
            <Coin details={coin} />
          </CoinItem>
        ))}
      </CoinsList>
    </Container>
  );
};
