import * as React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import "./popup.css";
import "./bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { setStorage, getStorage } from "../utils/storage";

const BACKEND_URL = "http://3.0.100.46:8000/";

interface historyBoxProps {
  text?: string;
  status?: string;
  date?: string;
}

const HistoryBox = ({
  text = "placeholder",
  status = "Processing",
  date = "date placeholder",
}: historyBoxProps) => {
  return (
    <div className="history-box">
      <div className="ellipsis history-box-sub1">
        This is a very long long long long long lomng long
        fadsjfalsdjfaslkdjfas;lfdjas;djf text
      </div>
      <div className="history-box-sub2 d-flex justify-content-between gap-1 margin-top-1">
        <div>Scanning Time</div>
        {status == "Processing" && (
          <div className="px-1 status-processing">Processing</div>
        )}

        {status == "Processed" && (
          <div className="px-1 status-processed">Processed</div>
        )}
      </div>
    </div>
  );
};

const App: React.FC<{}> = () => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);

  const [text2, setText2] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [error, setError] = useState("");

  const handleChangePassword = (event) => {
    setError("");
    setPassword(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setError("");
    setEmail(event.target.value);
  };

  const getUserId = () => {
    chrome.storage.local.get("auth_token", (res) => {
      let decoded: any = jwt_decode(res.auth_token);
      setUserId(decoded.user_id);
      chrome.storage.local.set({ user: decoded.user_id });
      chrome.storage.local.set({ email: decoded.username });
      setEmail(decoded.username);
      // chrome.storage.local.set({ user: decoded});
    });
  };

  const checkLogin = () => {
    chrome.storage.local.get("auth_token", (res) => {
      if (res.auth_token == "") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        getUserId();
      }
    });
  };

  useEffect(() => {
    checkLogin();
  });

  const handleLogin = async () => {
    // chrome.storage.local.set({
    //   credentials: text,
    // });

    if (email != "" && password != "") {
      let response = await fetch(`${BACKEND_URL}accounts/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status == 200) {
        setIsLoggedIn(true);
        chrome.storage.local.set({
          auth_token: data.access,
        });

        getUserId();
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("Please enter email and password");
    }
  };

  const handleLogout = () => {
    chrome.storage.local.set({
      auth_token: "",
    });

    chrome.storage.local.set({
      user: "",
    });

    setEmail("");
    setPassword("");
    setError("");
    setIsLoggedIn(false);
  };

  const handleSignup = () => {
    chrome.tabs.create({
      url: "http://3.0.100.46:8000/signUp",
    });
  };

  const handleRetrieve = () => {
    chrome.storage.local.get("credentials", (res: any) => {
      setText2(res.credentials);
    });
  };

  const loginElement = (
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
                handleChangeEmail(event);
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
                handleChangePassword(event);
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
              onClick={handleLogin}
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
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      {error != "" && (
        <div className="row">
          <div className="col">
            <div className="text-red text-center ">
              <p>Error: {error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const mainPageElement = (
    <div>
      <div className="logoText text-center ">
        <span className="theme-color">Knowledge</span>.Ai
      </div>

      <div className="d-flex justify-content-center gap-1 ">
        <div className="d-flex align-content-center">
          <div className="py-1 px-1 text-black font-bold fw-bold h-100 align-text-middle border rounded-2 bg-gray ">
            {email}
          </div>
        </div>

        <button
          className="ml-1 py-1 font-bold border-0 rounded-2 button-bg-theme-color text-white text-bold"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      <div className="history-title">History</div>

      <HistoryBox text="dkfaj;dsfkja;dskfjas;ldfjaslkdf" date="20-03-2021" status="Processing"/>
      <HistoryBox text="dkfaj;dsfkja;dskfjas;ldfjaslkdf" date="20-03-2021" status="Processed"/>
      <HistoryBox text="dkfaj;dsfkja;dskfjas;ldfjaslkdf" date="20-03-2021" status="Processed"/>

    

      <div className="text-center theme-color">See All..</div>
    </div>
  );

  return (
    <div
      className={`${
        isLoggedIn == false
          ? "container-main_justify_align"
          : "container-main-justify"
      } `}
    >
      {isLoggedIn == false && loginElement}
      {isLoggedIn == true && mainPageElement}
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
render(<App />, root);
