import styled from "@emotion/styled";

const Pill = styled.span`
  background-color: #141822;
  border-radius: 0.4375rem;
  text-transform: uppercase;
  padding: 0.25rem 0.625rem;
  font-weight: 500;
  font-size: 0.5em;
  line-height: 1.25em;
  color: #e5e5e5;
  border: 0.5px solid #e5e54b;
`;

interface IProps {
  text: string;
}

export const PillComponent = ({ text }: IProps) => <Pill>{text}</Pill>;
