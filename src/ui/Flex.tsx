import styled from "styled-components";

import { space, flexbox, FlexboxProps, SpaceProps } from "styled-system";

interface FlexProps extends FlexboxProps, SpaceProps {
  gap?: string;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  ${space};
  ${flexbox};
  gap: ${({ gap }) => gap};
`;

export default Flex;
