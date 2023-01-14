import * as React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import "./popup.css";
import "./bootstrap.min.css";

import { setStorage, getStorage } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [text2, setText2] = useState();

  const [isLoggedIn, setIsLoggedIn ] = useState(false)

  const handleClick = () => {

    // chrome.storage.local.set({
    //   credentials: text,
    // });
  };

  const handleRetrieve = () => {
    chrome.storage.local.get("credentials", (res: any) => {
      setText2(res.credentials);
    });
  };

  return (
    <div className="container-main ">
      <div className="container w-full">
        <div className="row">
          <div className="col">
            <div className="logoText text-center ">
              <span className="theme-color">Knowledge</span>.Ai
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="text-black font-bold fw-bold text-center w-100 mt-2 ">
              <input
                className="px-2 w-75 rounded-2 border-1 "
                value={email}
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="text-black font-bold fw-bold text-center w-100 mt-2 ">
              <input
                className="px-2 w-75 rounded-2 border-1"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="text-black font-bold fw-bold text-center w-100 mt-2 ">
              <button
                className="w-50 py-1 font-bold border-0 rounded-2 button-bg-theme-color text-white text-bold"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="font-bold fw-bold text-center w-100 mt-2 ">
              <button
                className="w-50 py-1 font-bold border-2 rounded-2 border-theme-color text-bold  "
                onClick={handleClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
document.head.innerHTML +=
  '<link rel="stylesheet" href="./popup.css" type="text/css"/>';
render(<App />, root);
