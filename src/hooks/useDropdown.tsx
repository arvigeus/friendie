import { MouseEvent, useCallback, useRef, useState } from "react";

import {
  KEY_DOWN,
  KEY_END,
  KEY_ENTER,
  KEY_ESC,
  KEY_HOME,
  KEY_SPACEBAR,
  KEY_TAB,
  KEY_UP
} from "../const/keyCodes";

const getIndex = (
  entries: Array<[string, string]>,
  active: string | undefined
) => (active ? entries.findIndex(([key]) => key === active) : -1);

const handleNavigation = (e: KeyboardEvent) => {
  // space and arrow keys
  if ([KEY_SPACEBAR, KEY_UP, KEY_DOWN].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
};

const useDropdown = (
  value: string | undefined,
  options: { [key: string]: string }
) => {
  const entries = Object.entries(options);
  const container = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(value);
  const [isOpen, setOpen] = useState(false);
  const [index, setIndex] = useState(getIndex(entries, active));

  // Handles clicking on radio buttons
  // This also triggers blur event (handleClose)
  const handleChange = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const { currentTarget } = e;
      setActive(currentTarget.value);
      if (container.current) container.current.focus();
    },
    [container]
  );

  const handleFocus = useCallback(() => {
    window.addEventListener("keydown", handleNavigation, false);
  }, []);

  const handleClose = useCallback(() => {
    window.removeEventListener("keydown", handleNavigation);
    setIndex(getIndex(entries, active));
    setOpen(false);
  }, [active, entries]);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      if (container.current) container.current.blur();
    }
    setIndex(getIndex(entries, active));
    setOpen(!isOpen);
  }, [container, isOpen, entries, active]);

  const handleKey = useCallback(
    // eslint-disable-next-line complexity
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (e.which) {
        case KEY_ESC:
          setIndex(getIndex(entries, active));
          if (container.current) {
            if (isOpen) container.current.focus();
            else container.current.blur();
          }
          setOpen(false);
          break;
        case KEY_UP:
          e.preventDefault();
          if (!isOpen) setOpen(true);
          else setIndex(index ? index - 1 : entries.length - 1);
          break;
        case KEY_DOWN:
          e.preventDefault();
          if (!isOpen) setOpen(true);
          else setIndex(index === entries.length - 1 ? 0 : index + 1);
          break;
        case KEY_HOME:
          e.preventDefault();
          if (!isOpen) setOpen(true);
          setIndex(0);
          break;
        case KEY_END:
          e.preventDefault();
          if (!isOpen) setOpen(true);
          setIndex(entries.length - 1);
          break;
        case KEY_TAB:
          // TODO: Go to each element, if end blur without prevent default
          break;
        default:
          break;
      }
    },
    [entries, active, isOpen, index]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.which !== KEY_ENTER) return;
      e.preventDefault();
      if (isOpen) {
        setActive(entries[index][0]);
        setOpen(false);
        if (container.current) container.current.focus();
      } else setOpen(true);
    },
    [isOpen, entries, index]
  );

  return {
    index,
    active,
    entries,
    isOpen,
    dropdownProps: {
      ref: container,
      onClick: handleToggle,
      onFocus: handleFocus,
      onBlur: handleClose,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKey
    },
    handleChange
  };
};

export default useDropdown;
