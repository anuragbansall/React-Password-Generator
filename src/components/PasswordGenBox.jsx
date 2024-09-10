import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordGenBox() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumberIncluded, SetIsNumberIncluded] = useState(false);
  const [isSymbolIncluded, SetIsSymbolIncluded] = useState(false);
  const [isUppercaseLetterIncluded, SetIsUppercaseLetterIncluded] = useState(true);
  const [isLowerCaseLetterIncluded, SetIsLowerCaseLetterIncluded] = useState(true);

  const passwordRef = useRef(null)

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const handleIsIncluded = (event) => {
    if (event.target.id === "includeNumber") {
      SetIsNumberIncluded((prevVal) => !prevVal);
    } else if (event.target.id === "includeSymbols") {
      SetIsSymbolIncluded((prevVal) => !prevVal);
    } else if (event.target.id === "includeLowercaseLetters") {
      SetIsLowerCaseLetterIncluded((prevVal) => !prevVal);
    } else if (event.target.id === "includeUppercaseLetters") {
      SetIsUppercaseLetterIncluded((prevVal) => !prevVal);
    }
  };

  const generatePassword = useCallback(
    (length) => {
      let password = "";
      let characters = "";
      if (isLowerCaseLetterIncluded) characters += "abcdefghijklmnopqrstuvwxyz";
      if (isUppercaseLetterIncluded) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (isNumberIncluded) characters += "123456789";
      if (isSymbolIncluded) characters += "!@#$%^&*()_+";

      if (characters.length === 0) {
        return "";
      }

      for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }

      return password;
    },
    [
      length,
      isNumberIncluded,
      isSymbolIncluded,
      isLowerCaseLetterIncluded,
      isUppercaseLetterIncluded,
      setPassword
    ]
  );

  const notify = () => toast.success("Copied to Clipboard !");

  const handleCopyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

    password && notify()
  }, [password])
  
  
  useEffect(
    () => setPassword(() => generatePassword(length)),
    [
      length,
      isNumberIncluded,
      isSymbolIncluded,
      isLowerCaseLetterIncluded,
      isUppercaseLetterIncluded,
    ]
  );

  return (
    <div className="min-h-screen flex gap-4 justify-center items-center p-8">
      <ToastContainer autoClose={1000} />
      <div className="w-[30rem] max-w-full flex flex-col gap-4 text-zinc-400">
        <h2 className="text-center text-2xl font-semibold">
          Password Generator
        </h2>
        <div className="w-full flex gap-4 items-center bg-[#24232A] px-6 py-2 text-2xl">
          <input
            type="text"
            className="flex-grow min-h-[2rem] overflow-x-hidden bg-inherit outline-none border-none"
            readOnly
            value={password}
            placeholder="Please select at least one option!"
            ref={passwordRef}
          />
          <span className="cursor-pointer" onClick={handleCopyPassword}>
            <FaCopy />
          </span>
        </div>
        <div className="w-full bg-[#24232A] flex flex-col gap-4 px-6 py-8 text-2xl">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Character Length</p>
            <span className="text-[#A5FFAF]">{length}</span>
          </div>
          <input
            type="range"
            className="w-full cursor-pointer"
            min={1}
            max={40}
            step={1}
            value={length}
            onChange={handleLengthChange}
          />
          <div className="flex flex-col gap-2">
            {[
              {
                label: "Include Uppercase Letters",
                id: "includeUppercaseLetters",
                isIncluded: isUppercaseLetterIncluded,
              },
              {
                label: "Include Lowercase Letters",
                id: "includeLowercaseLetters",
                isIncluded: isLowerCaseLetterIncluded,
              },
              {
                label: "Include Symbols",
                id: "includeSymbols",
                isIncluded: isSymbolIncluded,
              },
              {
                label: "Include Numbers",
                id: "includeNumber",
                isIncluded: isNumberIncluded,
              },
            ].map((item, index) => (
              <li className="flex items-center gap-4 text-xl" key={index}>
                <input
                  type="checkbox"
                  id={item.id}
                  className="size-4 cursor-pointer"
                  checked={item.isIncluded}
                  onChange={handleIsIncluded}
                />
                <label htmlFor={item.id} className="cursor-pointer">
                  {item.label}
                </label>
              </li>
            ))}
          </div>
          {/* <button className='bg-[#A5FFAF] text-black w-full px-4 py-2 font-semibold text-xl'>GENERATE</button> */}
        </div>
      </div>
    </div>
  );
}

export default PasswordGenBox;
