/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Select.scss";
import "../../assets/index";
import { chrome, edge, mozilla, opera, safari } from "../../assets/index";
import { useState } from "react";
export function Select() {
  const [activate, setActivate] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  function active() {
    setActivate(!activate);
  }
  function selectOption(e: any) {
    setSelected(e.target.innerText);
    active();
  }
  return (
    <div className="select-box">
      <div
        className={activate ? "selected-option active" : "selected-option"}
        onClick={active}
      >
        <input
          type="text"
          readOnly
          placeholder="Select your favorite Browser"
          value={selected}
        />
      </div>
      <ul className="options">
        <li className="option" onClick={selectOption}>
          Google Chrome
          <img src={chrome} alt="null" />
        </li>
        <li className="option" onClick={selectOption}>
          Safari <img src={safari} alt="null" />
        </li>
        <li className="option" onClick={selectOption}>
          Mozilla Firefox <img src={mozilla} alt="null" />
        </li>
        <li className="option" onClick={selectOption}>
          Microsoft Edge <img src={edge} alt="null" />
        </li>
        <li className="option" onClick={selectOption}>
          Opera <img src={opera} alt="null" />
        </li>
      </ul>
    </div>
  );
}
