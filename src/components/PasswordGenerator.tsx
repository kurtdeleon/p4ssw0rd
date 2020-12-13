import React, { useState, useReducer, useEffect } from "react";
import OptionBox from "src/components/base/OptionBox";
import PasswordContainer from "src/components/PasswordContainer";
import PasswordLengthBox from "src/components/PasswordLengthBox";
import HaveIBeenPwned from "src/components/HaveIBeenPwned";
import SpecialCharactersBox from "src/components/SpecialCharactersBox";
import "./PasswordGenerator.scss";

const randomize = require("randomatic");
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numeric = "0123456789";
const specialChars = "!?\"#$%&'*+,.:;<=>@^~-_`[](){}/|\\";
const defaultLength = 16;
const minLength = 8;
const maxLength = 64;

type Actions =
  | { type: "include"; chars: string }
  | { type: "exclude"; chars: string }
  | { type: "replace"; chars: string };

const IncludedSpecialReducer = (state: string, action: Actions) => {
  switch (action.type) {
    case "exclude":
      return state.replace(new RegExp(`\\${action.chars}`, "g"), "");
    case "include":
      return state.concat(action.chars);
    case "replace":
      return action.chars;
  }
};

const PasswordGenerator: React.FC<{}> = () => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(defaultLength);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includedSpecial, setIncludedSpecial] = useReducer(
    IncludedSpecialReducer,
    "!?@#&_"
  );
  const allowPasswordGeneration =
    includeUppercase ||
    includeLowercase ||
    includeNumbers ||
    includedSpecial.length > 0;

  useEffect(() => {
    generatePassword();
  }, []);

  const generatePassword = () => {
    let chars = includedSpecial;
    if (includeUppercase) chars = chars.concat(uppercase);
    if (includeLowercase) chars = chars.concat(lowercase);
    if (includeNumbers) chars = chars.concat(numeric);
    setPassword(randomize("?", length, { chars: chars }));
  };

  const updateLength = (length: number) => {
    setLength(length < 1 ? 1 : length);
  };

  const toggleChar = (c: string) => {
    setIncludedSpecial({
      type: includedSpecial.includes(c) ? "exclude" : "include",
      chars: c
    });
  };

  const toggleSpecialChars = () => {
    setIncludedSpecial({
      type: "replace",
      chars: includedSpecial.length < specialChars.length ? specialChars : ""
    });
  };

  return (
    <div id="generator">
      <div className="column-container">
        <PasswordLengthBox
          length={length}
          min={minLength}
          max={maxLength}
          setLength={updateLength}
        />
        <OptionBox
          text={`Uppercase Letters`}
          subText={uppercase}
          checked={includeUppercase}
          indeterminate={false}
          handleClick={() =>
            setIncludeUppercase((includeUppercase) => !includeUppercase)
          }
        />
        <OptionBox
          text={`Lowercase Letters`}
          subText={lowercase}
          checked={includeLowercase}
          indeterminate={false}
          handleClick={() =>
            setIncludeLowercase((includeLowercase) => !includeLowercase)
          }
        />
        <OptionBox
          text={`Numerical Characters`}
          subText={numeric}
          checked={includeNumbers}
          indeterminate={false}
          handleClick={() =>
            setIncludeNumbers((includeNumbers) => !includeNumbers)
          }
        />
        <SpecialCharactersBox
          toggleChar={toggleChar}
          includedChars={includedSpecial}
          specialChars={specialChars}
        >
          <OptionBox
            text={`Special Characters`}
            subText={specialChars}
            checked={includedSpecial.length >= specialChars.length}
            indeterminate={
              includedSpecial.length > 0 &&
              includedSpecial.length < specialChars.length
            }
            handleClick={toggleSpecialChars}
          />
        </SpecialCharactersBox>
        <button
          onClick={generatePassword}
          id="generate-password-button"
          disabled={!allowPasswordGeneration}
          className="button--main"
        >
          {allowPasswordGeneration
            ? "Generate Password"
            : "Please select at least one character set to continue!"}
        </button>
      </div>
      <div className="column-container">
        <PasswordContainer setPassword={setPassword} password={password} />
        <HaveIBeenPwned password={password} />
      </div>
    </div>
  );
};

export default PasswordGenerator;
