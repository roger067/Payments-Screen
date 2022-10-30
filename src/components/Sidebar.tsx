import styled from "styled-components";

import { COLORS, Flex, Text } from "../ui";
import { ReactComponent as CreditCard } from "../assets/credit-card.svg";
import { ChevronLeft } from "@styled-icons/bootstrap";

const Sidebar = () => (
  <SidebarTag flexDirection="column">
    <BackToPrevStep as="a" alignItems="center" mb="50px" href="">
      <ChevronLeft size={16} color={COLORS.WHITE} />
      <Text
        ml="10px"
        fontWeight={400}
        fontSize="13px"
        lineHeight="16px"
        color={COLORS.WHITE}
      >
        Alterar forma de pagamento
      </Text>
    </BackToPrevStep>

    <Flex>
      <CreditCard />
      <Text
        ml="18px"
        fontWeight={700}
        color={COLORS.WHITE}
        lineHeight="24px"
        fontSize="20px"
      >
        Adicione um novo cartão de crédito
      </Text>
    </Flex>
  </SidebarTag>
);

const SidebarTag = styled(Flex)`
  background: ${COLORS.GREEN_500};
  height: 100%;
  width: 100%;
  padding: 50px 8px;
  max-width: 325px;

  span {
    max-width: 202px;
  }
`;

const BackToPrevStep = styled(Flex)`
  text-decoration: none;
`;

export default Sidebar;
