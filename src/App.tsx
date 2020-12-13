import React, { useState, useCallback } from "react";
import PasswordGenerator from "src/components/PasswordGenerator";
import { ReactComponent as Github } from "src/assets/github.svg";
import "./App.scss";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleTheme = useCallback(() => {
    setDarkMode((darkMode) => !darkMode);
  }, [darkMode]);

  return (
    <div id="app">
      <div id="title-bar">
        <span className="code">p4ssw0rd</span>
        {/* <input id="chck" type="checkbox" onClick={toggleTheme} />
        <label htmlFor="chck" className="check-trail">
          <span className="check-handler"></span>
        </label> */}
      </div>
      <PasswordGenerator />
      <div id="footer">
        <Github />
      </div>
    </div>
  );
};

export default App;
