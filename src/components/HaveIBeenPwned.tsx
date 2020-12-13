import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HaveIBeenPwned.scss";
const sha1 = require("sha-1");
const api = "https://api.pwnedpasswords.com/range/";

const HaveIBeenPwned: React.FC<{ password: string }> = ({ password }) => {
  const [verified, setVerified] = useState<boolean>(false);
  const [instances, setInstances] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getStatus = (verified: boolean, instances: number) => {
    if (loading) return "loading";
    return verified ? (instances > 0 ? "unsafe" : "safe") : "unverified";
  };

  const status = getStatus(verified, instances);

  const verify = () => {
    if (!loading) {
      const hash = sha1(password).toUpperCase();
      setLoading(true);
      axios
        .get(api.concat(hash.substring(0, 5)))
        .then((response) => {
          const count = findPassword(
            hash.substring(5, hash.length),
            response.data
          );
          setVerified(true);
          setInstances(count);
        })
        .catch((error) => {
          if (error.statusCode === 429) {
            alert(error.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setVerified(false);
    setInstances(0);
    verify();
  }, [password]);

  const findPassword = (suffix: String, data: String) => {
    const dataArr: string[] = data.split("\r\n");
    for (let str of dataArr) {
      const entryArr: string[] = str.split(":");
      if (entryArr[0] === suffix) {
        return parseInt(entryArr[1]);
      }
    }
    return 0;
  };

  return (
    <div
      className={`hibp-container hibp-container--${status}`}
      onClick={verify}
    >
      <div className={`status status--${status}`}>
        <span>{status}</span>
        <span>{`Powered by HaveIBeenPwned`}</span>
      </div>
      <span className="message">{`Generated passwords are automatically cross-checked with the Pwned Passwords database to verify its uniqueness.`}</span>
      <span className="instructions">{`Click anywhere to re-verify your password.`}</span>
    </div>
  );
};
export default HaveIBeenPwned;
