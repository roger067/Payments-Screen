import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { COLORS } from ".";

const Button = styled.button<SpaceProps>`
  ${space};
  background-color: ${COLORS.GREEN_600};
  color: ${COLORS.WHITE};
  border-radius: 4px;
  border: none;
  font-size: 15px;
  padding: 15px 28px;
  cursor: pointer;
  transition: background-color 200ms;

  &:hover {
    background-color: ${COLORS.GREEN_700};
  }
`;

export default Button;
