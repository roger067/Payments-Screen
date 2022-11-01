import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { COLORS } from ".";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
  return (
    <InputGroup>
      <input {...props} id={name} name={name} required={false} />
      <label htmlFor={name}>{label}</label>
    </InputGroup>
  );
};

const InputGroup = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 42px;

  input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: ${COLORS.GREY_700};
    border: none;
    border-bottom: 1px solid ${COLORS.GREY_400};
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
`;

export default Input;
