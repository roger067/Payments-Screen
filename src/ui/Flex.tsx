import styled from "styled-components";

import { space, flexbox, FlexboxProps, SpaceProps } from "styled-system";

const Flex = styled.div<FlexboxProps & SpaceProps>`
  display: flex;
  ${space};
  ${flexbox};
`;

export default Flex;
