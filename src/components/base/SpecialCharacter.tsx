import React from "react";
import "./SpecialCharacter.scss";

interface Props {
  char: string;
  toggle: () => void;
  included: boolean;
}

const SpecialCharacter: React.FC<Props> = ({ char, toggle, included }) => {
  return (
    <div
      className={`special-character special-character--${
        included ? "active" : "inactive"
      }`}
      onClick={toggle}
    >
      {char}
    </div>
  );
};

export default SpecialCharacter;
