import styled from "@emotion/styled";

const Button = styled.button`
  background: #e5e54b;
  border-radius: 0.875rem;
  padding: 1rem 2rem;
  width: 100%;
  border: 1px solid transparent;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  line-height: 130%;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    cursor: pointer;
    border: 1px solid #e5e54b;
    color: white;
    filter: brightness(0.5);
  }
`;

interface IProps {
  onClick: () => void;
}

export const SwapButton = ({ onClick }: IProps) => (
  <Button onClick={onClick}>Swap</Button>
);
