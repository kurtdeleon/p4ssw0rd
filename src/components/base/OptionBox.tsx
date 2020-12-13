import React, { useEffect, useRef } from "react";
import "./OptionBox.scss";

interface Props {
  text: string;
  subText: string;
  checked: boolean;
  indeterminate: boolean;
  handleClick: () => void;
}

const OptionBox: React.FC<Props> = ({
  text,
  subText,
  checked,
  indeterminate,
  handleClick
}) => {
  const checkRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    checkRef.current!.checked = checked;
    checkRef.current!.indeterminate = indeterminate;
  }, [checked, indeterminate]);

  return (
    <div className="setting setting--option" onClick={handleClick}>
      <label htmlFor={`ob-${subText}`} onClick={handleClick}>
        <span>{text}</span>
        <span>{subText}</span>
      </label>
      <input
        id={`ob-${subText}`}
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        ref={checkRef}
      />
      <span className="checkmark" />
    </div>
  );
};

export default OptionBox;
