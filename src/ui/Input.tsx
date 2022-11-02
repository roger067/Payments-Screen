import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { COLORS } from ".";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  errorMessage,
  ...props
}) => {
  return (
    <InputGroup hasError={!!errorMessage}>
      <input {...props} id={name} name={name} required />
      <label htmlFor={name}>{label}</label>
      <small>{errorMessage}</small>
    </InputGroup>
  );
};

const InputGroup = styled.div<{ hasError: boolean }>`
  width: 100%;
  position: relative;
  margin-bottom: 62px;

  input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: ${COLORS.GREY_700};
    border: none;
    border-bottom: ${({ hasError }) =>
      hasError
        ? `1.5px solid ${COLORS.RED_500}`
        : `1px solid ${COLORS.GREY_400}`};
    outline: none;
    background: transparent;
  }
  input:focus {
    outline: none;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: ${COLORS.GREY_400};
    pointer-events: none;
    transition: 0.4s;
  }

  input:focus ~ label,
  input:valid ~ label {
    top: -24px;
    font-size: 12px;
  }

  small {
    position: absolute;
    left: 0;
    top: 44.5px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14.4px;
    color ${COLORS.RED_500};
  }
`;

export default Input;
