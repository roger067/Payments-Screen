import styled from "styled-components";

import { space, flexbox, FlexboxProps } from "styled-system";

const Flex = styled.div<FlexboxProps>`
  display: flex;
  ${space};
  ${flexbox};
`;

export default Flex;
