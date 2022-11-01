import { Flex } from "../ui";

interface Props {
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
}

const Form: React.FC<Props> = ({ cardNumber, setCardNumber }) => {
  return (
    <Flex>
      <input
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
    </Flex>
  );
};

export default Form;
