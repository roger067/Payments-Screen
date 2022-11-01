import styled from "styled-components";
import { FormKeys, PaymentForm } from "../pages/Payment";
import { Button, Flex, Input } from "../ui";

interface Props {
  paymentForm: PaymentForm;
  setPaymentForm: React.Dispatch<React.SetStateAction<PaymentForm>>;
  setFocusedField: React.Dispatch<React.SetStateAction<FormKeys>>;
}

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

  return (
    <Flex flexDirection="column" alignItems="center" mt="62px">
      <StyledForm>
        <Input
          name="number"
          label="Número do cartão"
          value={paymentForm.number.value}
          onChange={(e) => handleInputChange(e.target.value, "number")}
          onFocus={(e) => handleInputFocus(e.target.name as FormKeys)}
        />
        <Input
          name="name"
          label="Nome (igual ao cartão)"
          value={paymentForm.name.value}
          onChange={(e) => handleInputChange(e.target.value, "name")}
          onFocus={(e) => handleInputFocus(e.target.name as FormKeys)}
        />
        <Flex gap="30px" className="group-wrapper">
          <Input
            name="expiry"
            label="Validade"
            value={paymentForm.expiry.value}
            onChange={(e) => handleInputChange(e.target.value, "expiry")}
            onFocus={(e) => handleInputFocus(e.target.name as FormKeys)}
          />
          <Input
            name="cvc"
            label="CVV"
            value={paymentForm.cvc.value}
            onChange={(e) => handleInputChange(e.target.value, "cvc")}
            onFocus={(e) => handleInputFocus(e.target.name as FormKeys)}
            onBlur={() => setFocusedField("number")}
          />
        </Flex>
        <Flex justifyContent="flex-end" className="button-wrapper">
          <Button mt="20px">CONTINUAR</Button>
        </Flex>
      </StyledForm>
    </Flex>
  );
};

const StyledForm = styled.form`
  max-width: 600px;
  width: 100%;

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
