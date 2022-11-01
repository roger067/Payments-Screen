import styled from "styled-components";

import Cards from "react-credit-cards";
import { ChevronLeft } from "@styled-icons/bootstrap";

import { COLORS, Flex, Text } from "../ui";
import { ReactComponent as CreditCard } from "../assets/credit-card.svg";

interface Props {
  cardNumber: string;
}

const Sidebar: React.FC<Props> = ({ cardNumber }) => (
  <SidebarTag flexDirection="column">
    <BackToPrevStep as="a" alignItems="center" mb="50px" href="">
      <ChevronLeft size={16} color={COLORS.WHITE} />
      <Text
        ml="10px"
        fontWeight={400}
        fontSize="13px"
        lineHeight="16px"
        color={COLORS.WHITE}
        className="anchor-text"
      >
        Alterar forma de pagamento
      </Text>
      <Text
        fontWeight={400}
        fontSize="13px"
        lineHeight="16px"
        textAlign="center"
        color={COLORS.WHITE}
        className="mobile-anchor-text"
      >
        <b>Etapa 2</b> de 3
      </Text>
      <div style={{ width: "20px" }} />
    </BackToPrevStep>

    <Flex flexDirection="column" className="credit-card-wrapper">
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
        number={cardNumber}
      />
    </Flex>
  </SidebarTag>
);

const SidebarTag = styled(Flex)`
  background: ${COLORS.GREEN_500};
  height: 100%;
  max-height: 100vh;
  width: 100%;
  padding: 50px 8px;
  max-width: 325px;

  @media (max-width: 720px) {
    max-width: 100%;
    height: auto;
    padding: 40px 8px 0;

    a {
      margin-bottom: 30px;
      justify-content: space-between;

      .anchor-text {
        display: none;
      }

      .mobile-anchor-text {
        display: block;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .title {
      margin-bottom: 16px;
    }

    .credit-card-wrapper {
      padding: 0 40px;
    }

    .rccs__card {
      height: auto;
      max-height: 172px;
      width: 100%;
      max-width: 100%;
      margin-bottom: -20%;
    }
  }

  .mobile-anchor-text {
    display: none;
  }

  .anchor-text {
    max-width: 202px;
  }

  .rccs {
    padding: 0;
    width: 100%;

    .rccs__card {
      border-radius: 14.5px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.349);
      height: 302px;
      width: 150%;
    }
  }
`;

const BackToPrevStep = styled(Flex)`
  text-decoration: none;
`;

export default Sidebar;
