import React from "react";
import styled, { css } from "styled-components";
import { lighten } from "polished";

import { colors } from "../../../style/theme";
import { HandwrittenText } from "../../Text";
import useDropdown from "../../../hooks/useDropdown";

interface DropdownProps extends React.HTMLProps<HTMLSelectElement> {
  /**
   * Default text when no option is selected
   */
  placeholder: string;
  /**
   * JSON object where keys are values of the options, and values are displayed text
   * @example { apple: "Apple", strawberry: "Strawberry", banana: "Banana" }
   */
  options: { [key: string]: string };
  /**
   * Default selected option (must be a valid key from options property)
   */
  value?: string;
  /**
   * Width of the dropdown
   * @default auto
   */
  width?: string;
  /**
   * Color of text
   * @default #333
   */
  color?: string;
  /**
   * Background of the dropdown.
   * @default #eee
   */
  backgroundColor?: string;
}

const Dropdown = ({
  name,
  value,
  options,
  placeholder,
  width = "auto",
  color = colors.black,
  backgroundColor = colors.paper
}: DropdownProps) => {
  const {
    index,
    active,
    entries,
    isOpen,
    dropdownProps,
    handleChange
  } = useDropdown(value, options);

  const valueAriaLabel =
    index < 0
      ? "unselected listbox"
      : `${active}, listbox ${index + 1} of ${entries.length}`;

  return (
    <Wrapper aria-haspopup="listbox" width={width} {...dropdownProps}>
      <Value
        aria-label={valueAriaLabel}
        color={color}
        backgroundColor={backgroundColor}
        aria-live="polite"
      >
        <HandwrittenText color={color}>
          {!isOpen && active && options[active] ? options[active] : placeholder}
        </HandwrittenText>
      </Value>
      <Container role="listbox">
        {entries.map(([key, value]: [string, string], idx: number) => (
          <Option
            key={key}
            role="option"
            aria-selected={index === idx}
            isOpen={isOpen}
            index={idx}
            backgroundColor={backgroundColor}
          >
            <input
              type="radio"
              name={name}
              value={key}
              onClick={handleChange}
              defaultChecked={key === active}
            />
            <HandwrittenText color={color}>{value}</HandwrittenText>
          </Option>
        ))}
      </Container>
    </Wrapper>
  );
};

interface PaperProps {
  backgroundColor: string;
}

const paper = css`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  background: ${({ backgroundColor }: PaperProps) =>
    `linear-gradient(${backgroundColor}, ${lighten(0.3, backgroundColor)})`};
  line-height: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s linear;
  user-select: none;
  will-change: transform;
`;

const Value = styled.label`
  ${paper};
  z-index: 4;
  display: block;
  padding: 0 20px;
  color: ${({ color }: { color?: string }) => color || colors.black};
  cursor: pointer;
  outline: none;
  transform-origin: 50% 100%;

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: "\\00203A";
    position: absolute;
    top: calc(75%);
    right: 12px;
    transform: translateY(-50%) rotate(90deg);
    font-size: 28px;
    pointer-events: none;
  }
`;

interface OptionProps {
  isOpen: boolean;
  index: number;
  backgroundColor: string;
}

const Option = styled.label<OptionProps>`
  ${paper};
  z-index: ${({ index }) => 3 - index};
  display: block;
  padding: 0 20px;
  cursor: pointer;
  margin-top: 8px;
  transform: ${({ index, isOpen }) =>
    !isOpen
      ? `translate3d(0, -${index * 56}px, 0) scale(${0.925 -
          0.025 * index}) !important`
      : `translateY(50px)`};
  visibility: ${({ isOpen, index }) =>
    isOpen || index < 3 ? "visible" : "hidden"};

  &[aria-selected="true"],
  &:hover,
  &:focus {
    transform: translateY(50px) scale(1.05);
  }

  &[aria-selected="true"] {
    font-weight: 900;
    transform: translateY(50px) scale(1.075);
  }

  & > input {
    display: none;
  }
`;

const Wrapper = styled.button`
  width: ${({ width }: { width: string }) => width};
  border: none;
  background: transparent;
  outline: none;
  perspective: 1000px;

  &:hover > ${Value} {
    transform: translate3d(0, -3px, 0) rotateX(15deg);
  }

  &:focus > ${Value} {
    transform: translate3d(0, -12px, 0) rotateX(30deg);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  margin-top: -55px;
`;

export default Dropdown;
