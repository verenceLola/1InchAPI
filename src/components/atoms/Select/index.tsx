import styled from "@emotion/styled";
import { ArrowDownIcon } from "../Icons";
import { Coin } from "../Coin";
import { useState } from "react";
import { ICoin } from "@/models";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
}

export const CoinSelect = ({ coins }: IProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ICoin>(coins[0]);

  const onOpenDropDown = () => {
    setOpen((prevState) => !prevState);
  };

  const onSelectCoin = (address: string) => {
    const selectedCoin = coins.find((x) => x.address === address);

    if (selectedCoin) {
      setSelected(selectedCoin);
    }
  };

  return (
    <Container>
      <SelectContainer>
        {selected && <Coin details={selected} />}
        <ArrowDownIcon onClick={onOpenDropDown} style={{ marginTop: -4 }} />
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
