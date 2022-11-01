import { useState } from "react";
import styled from "styled-components";

import { Form, Sidebar } from "../components";
import { Container, Flex, Steps } from "../ui";
import { Step } from "../ui/Steps";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");

  const steps: Step[] = [
    {
      title: "Carrinho",
      status: "finished",
    },
    {
      title: "Pagamento",
      status: "default",
    },
    {
      title: "Confirmação",
      status: "default",
    },
  ];

  return (
    <PaymentWrapper>
      <Sidebar cardNumber={cardNumber} />
      <Container className="container">
        <Steps steps={steps} />
        <Form {...{ cardNumber, setCardNumber }} />
      </Container>
    </PaymentWrapper>
  );
};

const PaymentWrapper = styled(Flex)`
  height: 100%;

  .container {
    padding-top: 50px;
  }

  @media (max-width: 720px) {
    flex-direction: column;

    .steps {
      display: none;
    }
  }
`;

export default Payment;
