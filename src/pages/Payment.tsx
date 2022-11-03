import { useState } from "react";
import styled from "styled-components";

import { Form, Sidebar } from "../components";
import { Container, Flex, Steps, Alert } from "../ui";
import { Step } from "../ui/Steps";
import {
  isCardNumberInvalid,
  isCVVInvalid,
  isExpiryInvalid,
} from "../utils/validator";

export type FormKeys = "name" | "expiry" | "cvc" | "number";

export type PaymentForm = {
  [key in FormKeys | "portion"]: {
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
    portion: {
      value: "",
      hasError: false,
    },
  });

  const [focusedField, setFocusedField] = useState<FormKeys>("name");
  const [requestState, setRequestState] = useState("");

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

  const getEmptyFields = (
    fields: [
      string,
      {
        value: string;
        hasError: boolean;
      }
    ][]
  ) => {
    const emptyValues = fields.filter((field) => field[1].value === "");

    emptyValues.map((field) =>
      setPaymentForm((prevState) => ({
        ...prevState,
        [field[0]]: {
          value: prevState[field[0] as FormKeys].value,
          hasError: true,
        },
      }))
    );

    return emptyValues;
  };

  const registerPayment = async () => {
    const body = {
      name: paymentForm.name.value,
      number: paymentForm.number.value,
      cvc: paymentForm.cvc.value,
      expiry: paymentForm.expiry.value,
      portion: paymentForm.portion.value,
    };

    try {
      const { status } = await fetch("/pagar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (status !== 200) {
        setRequestState("danger");
      } else {
        setRequestState("success");
      }
    } catch {
      setRequestState("danger");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      getEmptyFields(Object.entries(paymentForm)).length ||
      isCardNumberInvalid(paymentForm.number.value) ||
      isExpiryInvalid(paymentForm.expiry.value) ||
      isCVVInvalid(paymentForm.cvc.value)
    )
      return;

    registerPayment();
  };

  return (
    <PaymentWrapper>
      <Sidebar {...{ paymentForm, focusedField }} />
      <Container className="container">
        <Steps steps={steps} />
        {requestState && (
          <Flex justifyContent="center" mt="42px">
            <Alert
              text={
                requestState === "success"
                  ? "Cartão adicionado com sucesso!"
                  : "Erro ao adicionar cartão!"
              }
              state={requestState as "success" | "danger"}
            />
          </Flex>
        )}
        <Form {...{ paymentForm, setPaymentForm, setFocusedField, onSubmit }} />
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
