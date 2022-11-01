import { Button, Flex } from "../ui";

interface Props {
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
}

const Form: React.FC<Props> = ({ cardNumber, setCardNumber }) => {
  return (
    <Flex flexDirection="column">
      <Flex my="62px">
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </Flex>
      <Flex>
        <Button>CONTINUAR</Button>
      </Flex>
    </Flex>
  );
};

export default Form;
