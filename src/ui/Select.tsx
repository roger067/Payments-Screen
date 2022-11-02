import { ChevronDown } from "@styled-icons/bootstrap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text, COLORS } from ".";

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  itens: {
    label: string;
    value: string;
  }[];
}

const Select: React.FC<SelectProps> = ({ label, onChange, value, itens }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(!!value);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickItem = (value: string) => {
    onChange(value);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const selectedValue = itens.find((item) => item.value === value)?.label;

  return (
    <SelectGroup ref={ref}>
      <SelectTag
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        type="button"
        className={isDropdownOpen ? "selected" : ""}
      >
        <Text fontSize="16px" color={COLORS.GREY_700}>
          {selectedValue}
        </Text>
        <ChevronDown size={16} color={COLORS.GREEN_500} />
      </SelectTag>
      <label className={isDropdownOpen || !!value ? "selected" : ""}>
        {label}
      </label>
      {isDropdownOpen && (
        <Dropdown>
          {itens.map((item) => (
            <Item key={item.value} onClick={() => handleClickItem(item.value)}>
              {item.label}
            </Item>
          ))}
        </Dropdown>
      )}
    </SelectGroup>
  );
};

const SelectGroup = styled.div`
  position: relative;

  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: ${COLORS.GREY_400};
    pointer-events: none;
    transition: 0.4s;

    &.selected {
      top: -24px;
      font-size: 12px;
    }
  }
`;

const SelectTag = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 39px;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${COLORS.GREY_400};
  outline: none;
  cursor: pointer;

  svg {
    transition: transform 300ms;
  }

  &.selected {
    svg {
      transform: rotate(180deg);
    }
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  width: 100%;
  background: ${COLORS.WHITE};
  padding: 16px 8px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 2%) 0px 1.4px 2.3px, rgb(0 0 0 / 4%) 0px 4px 6.3px,
    rgb(0 0 0 / 5%) 0px 9.6px 15.1px, rgb(0 0 0 / 7%) 0px 32px 50px;
  max-height: 150px;
  list-style-type: none;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${COLORS.WHITE};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.GREY_500};
    border-radius: 8px;
  }
`;

const Item = styled.li`
  padding: 12px 8px;
  margin: 0;
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: ${COLORS.GREY_400};
    border-radius: 8px;
  }
`;

export default Select;
