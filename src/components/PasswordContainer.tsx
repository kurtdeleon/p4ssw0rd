import React, { useState, useRef } from "react";
import { ReactComponent as EyeOpen } from "src/assets/eye_open.svg";
import { ReactComponent as EyeClose } from "src/assets/eye_close.svg";
import "./PasswordContainer.scss";

interface Props {
  password: string;
  setPassword: (p: string) => void;
}

const PasswordContainer: React.FC<Props> = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const copyPassword = () => {
    inputRef.current?.select();
    document.execCommand("copy");
  };

  return (
    <div className="password-container">
      <div id="password-field">
        <input
          id="password-input"
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <button onClick={togglePassword}>
          {showPassword ? <EyeOpen /> : <EyeClose />}
        </button>
      </div>
      <button onClick={copyPassword} className="button--main">
        Copy to Clipboard
      </button>
    </div>
  );
};

export default PasswordContainer;
