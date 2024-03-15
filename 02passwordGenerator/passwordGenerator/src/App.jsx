import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@$%&*?";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="wrapper">
        <div>
          <h1>Password Generator</h1>
        </div>
        <div className="container">
          <div className="input-container">
            <input type="text" value={password} readOnly ref={passwordRef} />
            <button className="cpy-btn" onClick={copyPassword}>
              Copy
            </button>
          </div>
          <div className="control-structure">
            <label htmlFor="length">Length</label>
            <input
              type="range"
              id="length"
              name="length"
              min={8}
              max={20}
              step={1}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <span>{length}</span>
            <div className="control-panel-bottom">
              <div>
                <label htmlFor="">Numbers</label>
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  name="options"
                  value="numbers"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Characters</label>
                <input
                  type="checkbox"
                  name="options"
                  value="characters"
                  defaultChecked={charAllowed}
                  onChange={() => {
                    setCharAllowed((prev) => !prev);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
