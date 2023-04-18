import styled from "@emotion/styled";
import { SwapIcons } from "../Icons";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const SwapButtom = styled.button`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  border: 1px solid #101010;
  background: #101010;
  cursor: pointer;
  position: absolute;
  top: 50%;
  bottom: 50%;
  right: 50%;
  transform: translate(0%, -50%);
`;

const HR = styled.hr`
  border: 1px solid #101010;
  height: 1px;
  border-bottom: none;
  margin: none;
  width: 100%;
`;

interface IProps {
  onClick: () => void;
}

export const SwapDivider = ({ onClick }: IProps) => (
  <Container>
    <HR />
    <SwapButtom onClick={onClick}>
      <SwapIcons />
    </SwapButtom>
  </Container>
);
