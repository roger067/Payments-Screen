import styled from "styled-components";
import { FormKeys, PaymentForm } from "../pages/Payment";
import { Button, Flex, Input, Select } from "../ui";
import {
  isCardNumberInvalid,
  isCVVInvalid,
  isExpiryInvalid,
} from "../utils/validator";

interface Props {
  paymentForm: PaymentForm;
  setPaymentForm: React.Dispatch<React.SetStateAction<PaymentForm>>;
  setFocusedField: React.Dispatch<React.SetStateAction<FormKeys>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PRICE = 12000;

const Form: React.FC<Props> = ({
  paymentForm,
  setPaymentForm,
  setFocusedField,
  onSubmit,
}) => {
  const handleInputChange = (value: string, name: FormKeys) => {
    let formattedText = value;

    if (name === "number") {
      formattedText = value
        .replace(/[^0-9.]/g, "")
        .split(" ")
        .join("");
      if (formattedText.length <= 16) {
        formattedText =
          formattedText.match(new RegExp(".{1,4}", "g"))?.join(" ") || "";
      }
    }

    if (name === "expiry") {
      formattedText = value
        .replace(/[^0-9]/g, "")
        .replace(/^([2-9])$/g, "0$1")
        .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
        .replace(/^0{1,}/g, "0")
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
    }

    setPaymentForm((prevState) => ({
      ...prevState,
      [name]: { value: formattedText, hasError: false },
    }));
  };

  const handleInputBlur = (value: string, name: FormKeys) => {
    const mapErrors = {
      cvc: isCVVInvalid(value),
      number: isCardNumberInvalid(value),
      expiry: isExpiryInvalid(value),
      name: false,
    };

    setPaymentForm((prevState) => ({
      ...prevState,
      [name]: { value, hasError: mapErrors[name] },
    }));
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

  return (
    <Flex flexDirection="column" alignItems="center" mt="62px">
      <StyledForm onSubmit={onSubmit}>
        <Input
          name="number"
          label="Número do cartão"
          maxLength={19}
          value={paymentForm.number.value}
          errorMessage={
            paymentForm.number.hasError
              ? "Número de cartão inválido"
              : undefined
          }
          onChange={(e) => handleInputChange(e.target.value, "number")}
          onBlur={(e) => handleInputBlur(e.target.value, "number")}
        />
        <Input
          name="name"
          label="Nome (igual ao cartão)"
          value={paymentForm.name.value}
          maxLength={22}
          errorMessage={
            paymentForm.name.hasError ? "Insira seu nome completo" : undefined
          }
          onChange={(e) => handleInputChange(e.target.value, "name")}
          onBlur={(e) => handleInputBlur(e.target.value, "name")}
        />
        <Flex gap="30px" className="group-wrapper">
          <Input
            name="expiry"
            label="Validade"
            value={paymentForm.expiry.value}
            errorMessage={
              paymentForm.expiry.hasError ? "Data inválida" : undefined
            }
            onChange={(e) => handleInputChange(e.target.value, "expiry")}
            onBlur={(e) => handleInputBlur(e.target.value, "expiry")}
          />
          <Input
            name="cvc"
            label="CVV"
            maxLength={3}
            value={paymentForm.cvc.value}
            errorMessage={
              paymentForm.cvc.hasError ? "Código inválido" : undefined
            }
            onChange={(e) =>
              handleInputChange(e.target.value.replace(/[^0-9.]/g, ""), "cvc")
            }
            onFocus={(e) => setFocusedField("cvc")}
            onBlur={(e) => {
              setFocusedField("number");
              handleInputBlur(e.target.value, "cvc");
            }}
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
