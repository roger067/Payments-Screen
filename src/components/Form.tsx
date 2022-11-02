import styled from "styled-components";
import { FormKeys, PaymentForm } from "../pages/Payment";
import { Button, Flex, Input, Select } from "../ui";

interface Props {
  paymentForm: PaymentForm;
  setPaymentForm: React.Dispatch<React.SetStateAction<PaymentForm>>;
  setFocusedField: React.Dispatch<React.SetStateAction<FormKeys>>;
}

const PRICE = 12000;

const Form: React.FC<Props> = ({
  paymentForm,
  setPaymentForm,
  setFocusedField,
}) => {
  const handleInputChange = (value: string, name: FormKeys) => {
    setPaymentForm((prevState) => ({
      ...prevState,
      [name]: { value, hasError: false },
    }));
  };

  const handleInputFocus = (name: FormKeys) => {
    setFocusedField(name);
  };

  const formatCurrency = (number: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number);

  const portions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const itens = portions.map((portion) => ({
    label: `${portion}x ${formatCurrency(PRICE / Number(portion))} sem juros`,
    value: portion,
  }));

  const registerPayment = async () => {
    const body = {
      name: paymentForm.name.value,
      number: paymentForm.number.value,
      cvc: paymentForm.cvc.value,
      expiry: paymentForm.expiry.value,
      portion: paymentForm.portion.value,
    };

    try {
      await fetch("/pagar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      alert(JSON.stringify(body));
    } catch {
      alert("deu ruim");
    }
  };

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (getEmptyFields(Object.entries(paymentForm)).length) return;

    registerPayment();
  };

  return (
    <Flex flexDirection="column" alignItems="center" mt="62px">
      <StyledForm onSubmit={onSubmit}>
        <Input
          name="number"
          label="Número do cartão"
          value={paymentForm.number.value}
          errorMessage={
            paymentForm.number.hasError
              ? "Insira o número do cartão"
              : undefined
          }
          onChange={(e) => handleInputChange(e.target.value, "number")}
          onFocus={(e) => handleInputFocus(e.target.name as FormKeys)}
        />
        <Input
          name="name"
          label="Nome (igual ao cartão)"
          value={paymentForm.name.value}
          errorMessage={
            paymentForm.name.hasError ? "Insira seu nome completo" : undefined
          }
          onChange={(e) => handleInputChange(e.target.value, "name")}
          onFocus={(e) => handleInputFocus(e.target.name as FormKeys)}
        />
        <Flex gap="30px" className="group-wrapper">
          <Input
            name="expiry"
            label="Validade"
            value={paymentForm.expiry.value}
            errorMessage={
              paymentForm.expiry.hasError
                ? "Insira a validade do cartão"
                : undefined
            }
            onChange={(e) => handleInputChange(e.target.value, "expiry")}
            onFocus={(e) => handleInputFocus(e.target.name as FormKeys)}
          />
          <Input
            name="cvc"
            label="CVV"
            value={paymentForm.cvc.value}
            errorMessage={
              paymentForm.cvc.hasError ? "Insira o CVV do cartão" : undefined
            }
            onChange={(e) => handleInputChange(e.target.value, "cvc")}
            onFocus={(e) => handleInputFocus(e.target.name as FormKeys)}
            onBlur={() => setFocusedField("number")}
          />
        </Flex>
        <Select
          label="Número de parcelas"
          name="portions"
          errorMessage={
            paymentForm.portion.hasError
              ? "Insira o número de parcelas"
              : undefined
          }
          onChange={(value) =>
            setPaymentForm((prevState) => ({
              ...prevState,
              portion: { value, hasError: false },
            }))
          }
          value={paymentForm.portion.value}
          itens={itens}
        />
        <Flex justifyContent="flex-end" className="button-wrapper" my="62px">
          <Button>CONTINUAR</Button>
        </Flex>
      </StyledForm>
    </Flex>
  );
};

const StyledForm = styled.form`
  max-width: 600px;
  width: 100%;

  @media (max-width: 1100px) {
    max-width: 325px;
  }

  @media (max-width: 768px) {
    .group-wrapper {
      gap: 10px;
    }

    .button-wrapper {
      justify-content: center;
    }
  }
`;

export default Form;
