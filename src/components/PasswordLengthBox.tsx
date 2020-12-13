import React, { useRef, useEffect } from "react";
import "./PasswordLengthBox.scss";

interface Props {
  length: number;
  setLength: (l: number) => void;
  min: number;
  max: number;
}

const PasswordLengthBox: React.FC<Props> = ({
  setLength,
  length,
  min,
  max
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current!.value = length.toString();
  }, [length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      const length = parseInt((e.target as HTMLInputElement).value);
      if (length >= min && length <= max) setLength(length);
    }
  };
  return (
    <div className="setting setting--length">
      <div>
        <div id="length-display">
          <label htmlFor="password-length-display">{`Length:`}</label>
          <input
            type="number"
            id="password-length-display"
            min={min}
            max={max}
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div id="length-presets">
          <label htmlFor="preset-buttons">{`Presets:`}</label>
          <div id="preset-buttons">
            <button
              className={length === 16 ? "preset-button-active" : ""}
              onClick={() => setLength(16)}
            >{`Strong (16)`}</button>
            <button
              className={length === 32 ? "preset-button-active" : ""}
              onClick={() => setLength(32)}
            >{`Secure (32)`}</button>
            <button
              className={length === 64 ? "preset-button-active" : ""}
              onClick={() => setLength(64)}
            >{`Overkill (64)`}</button>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            if (length > min) setLength(length - 1);
          }}
        >{`<`}</button>
        <input
          type="range"
          id="password-length"
          value={length}
          min={min}
          max={max}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        <button
          onClick={() => {
            if (length < max) setLength(length + 1);
          }}
        >{`>`}</button>
      </div>
    </div>
  );
};

export default PasswordLengthBox;
