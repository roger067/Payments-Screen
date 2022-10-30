import styled from "styled-components";
import { COLORS, Flex } from "../ui";

const Sidebar = () => <SidebarTag>teste</SidebarTag>;

const SidebarTag = styled(Flex)`
  background: ${COLORS.GREEN_500};
  height: 100%;
  width: 100%;
  max-width: 325px;
`;

export default Sidebar;
