import styled from "styled-components";
import { Form, Sidebar } from "../components";
import { Container, Flex } from "../ui";

const Payment = () => {
  return (
    <PaymentWrapper>
      <Sidebar />
      <Container>
        <Form />
      </Container>
    </PaymentWrapper>
  );
};

const PaymentWrapper = styled(Flex)`
  height: 100%;
`;

export default Payment;
