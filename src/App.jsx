import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, SetPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "!<>?:;@{}[]()*&^%$£";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    SetPassword(pass);
  }, [length, number, character, SetPassword]);

  const passwordCopy = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,4)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <>
      <div className="bg-blue-300 max-w-md  mx-auto my-20 py-10  px-5 ">
        <div className="w-full  text-center flex">
          <input
            className="flex-grow"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="bg-pink-200 px-4 py-2" onClick={passwordCopy}>
            Copy
          </button>
        </div>
        <div className="py-4 flex gap-3">
          <input
            className="cursor-pointer"
            type="range"
            min={6}
            max={35}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
          {/* numbercheckbox */}
          <div>
            <input
              type="checkbox"
              name=""
              id="numberInput"
              defaultChecked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          {/* charactercheckbox */}
          <div>
            <input
              type="checkbox"
              defaultChecked={character}
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
