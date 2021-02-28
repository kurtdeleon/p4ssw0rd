import React from "react";
import PasswordGenerator from "src/components/PasswordGenerator";
import { ReactComponent as Github } from "src/assets/github.svg";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div id="app">
      <div id="title-bar">
        <span className="code">p4ssw0rd</span>
      </div>
      <PasswordGenerator />
      <div id="footer">
        <a
          href="https://github.com/kurtdeleon/p4ssw0rd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
      </div>
    </div>
  );
};

export default App;
