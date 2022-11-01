import styled from "styled-components";
import { Button, Flex, Input } from "../ui";

interface Props {
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
}

const Form: React.FC<Props> = ({ cardNumber, setCardNumber }) => {
  return (
    <Flex flexDirection="column" alignItems="center" mt="62px">
      <StyledForm>
        <Input
          name="cardNumber"
          label="Número do cartão"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <Input
          name="name"
          label="Nome (igual ao cartão)"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <Flex gap="30px" className="group-wrapper">
          <Input
            name="cardNumber"
            label="Validade"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Input
            name="name"
            label="CVV"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
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
