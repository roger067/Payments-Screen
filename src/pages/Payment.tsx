import { useState } from "react";
import styled from "styled-components";

import { Form, Sidebar } from "../components";
import { Container, Flex } from "../ui";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");

  return (
    <PaymentWrapper>
      <Sidebar cardNumber={cardNumber} />
      <Container>
        <Form {...{ cardNumber, setCardNumber }} />
      </Container>
    </PaymentWrapper>
  );
};

const PaymentWrapper = styled(Flex)`
  height: 100%;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export default Payment;
