import styled from "styled-components";
import { CheckCircleFill, ChevronRight } from "@styled-icons/bootstrap";

import Flex from "./Flex";
import Text from "./Text";
import { COLORS } from ".";

export type Step = {
  status: "finished" | "default";
  title: string;
  onClick?: () => void;
};

interface Props {
  steps: Step[];
}

const Steps: React.FC<Props> = ({ steps }) => {
  return (
    <Flex justifyContent="center" className="steps" gap="27px">
      {steps.map((step, index) => (
        <StepTag onClick={step.onClick} alignItems="center" key={index}>
          {step.status === "finished" ? (
            <CheckCircleFill size={20} color={COLORS.GREEN_500} />
          ) : (
            <StepCircle alignItems="center" justifyContent="center">
              {index + 1}
            </StepCircle>
          )}
          <Text
            color={COLORS.GREEN_500}
            fontSize="13px"
            lineHeight="16px"
            ml="8px"
          >
            {step.title}
          </Text>
          {index + 1 !== steps.length && (
            <ChevronRight
              size={13}
              color={COLORS.GREEN_500}
              className="chevron"
            />
          )}
        </StepTag>
      ))}
    </Flex>
  );
};

const StepTag = styled(Flex)`
  cursor: pointer;

  .chevron {
    margin-left: 33px;
  }
`;

const StepCircle = styled(Flex)`
  width: 20px;
  height: 20px;
  border: 1px solid ${COLORS.GREEN_500};
  border-radius: 50%;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: ${COLORS.GREEN_500};
`;

export default Steps;
