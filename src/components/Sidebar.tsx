import styled from "styled-components";

import Cards from "react-credit-cards";
import { ChevronLeft } from "@styled-icons/bootstrap";

import { COLORS, Flex, Text } from "../ui";
import { ReactComponent as CreditCard } from "../assets/credit-card.svg";

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

    <Flex mb="30px" className="title">
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
    <Cards
      cvc="132"
      expiry="12/07"
      name="Rogério Moura"
      number="1234567812345678"
    />
  </SidebarTag>
);

const SidebarTag = styled(Flex)`
  background: ${COLORS.GREEN_500};
  height: 100%;
  width: 100%;
  padding: 50px 8px;
  max-width: 325px;

  @media (max-width: 720px) {
    max-width: 100%;
    height: auto;
    padding-bottom: 0;

    .title {
      margin-bottom: 16px;
    }

    .rccs__card {
      height: auto;
      width: 100%;
      max-width: 100%;
      margin-bottom: -20%;
    }
  }

  span {
    max-width: 202px;
  }

  .rccs {
    padding: 0;
    width: 100%;

    .rccs__card {
      height: 302px;
      width: 150%;
    }
  }
`;

const BackToPrevStep = styled(Flex)`
  text-decoration: none;
`;

export default Sidebar;
