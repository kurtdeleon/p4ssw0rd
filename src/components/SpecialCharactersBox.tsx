import React from "react";
import SpecialCharacter from "src/components/base/SpecialCharacter";
import "./SpecialCharactersBox.scss";

interface Props {
  toggleChar: (s: string) => void;
  includedChars: string;
  specialChars: string;
}

const SpecialCharactersBox: React.FC<Props> = ({
  children,
  toggleChar,
  includedChars,
  specialChars
}) => {
  return (
    <div>
      {children}
      <div id="special-characters-container">
        {specialChars.split("").map((c, idx) => (
          <SpecialCharacter
            key={idx}
            char={c}
            toggle={() => toggleChar(c)}
            included={includedChars.includes(c)}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialCharactersBox;
