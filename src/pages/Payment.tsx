import { useState } from "react";
import styled from "styled-components";

import { Form, Sidebar } from "../components";
import { Container, Flex, Steps } from "../ui";
import { Step } from "../ui/Steps";

export type FormKeys = "name" | "expiry" | "cvc" | "number";

export type PaymentForm = {
  [key in FormKeys]: {
    value: string;
    hasError: boolean;
  };
};

const Payment = () => {
  const [paymentForm, setPaymentForm] = useState({
    name: {
      value: "",
      hasError: false,
    },
    expiry: {
      value: "",
      hasError: false,
    },
    cvc: {
      value: "",
      hasError: false,
    },
    number: {
      value: "",
      hasError: false,
    },
  });

  const [focusedField, setFocusedField] = useState<FormKeys>("name");

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
      <Sidebar {...{ paymentForm, focusedField }} />
      <Container className="container">
        <Steps steps={steps} />
        <Form {...{ paymentForm, setPaymentForm, setFocusedField }} />
      </Container>
    </PaymentWrapper>
  );
};

const PaymentWrapper = styled(Flex)`
  height: 100%;

  .container {
    padding-top: 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .steps {
      display: none;
    }
  }
`;

export default Payment;
