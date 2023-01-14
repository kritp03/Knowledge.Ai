import React, { useEffect, useContext, useState, useRef } from "react";
import {
  Stack,
  styled,
  Card,
  ThemeProvider,
  Button,
  createTheme,
} from "@mui/material";
import { HistoryTable } from "../components/main/HistoryTable";
import { TextInput } from "../components/main/TextInput";
import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const logoutButtonStyle = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#0C3B2E",
          color: "#FFF",
          fontSize: "0.875rem",
          textTransform: "capitalize",
          borderRadius: "8px",
          width: "100px",
          "&:hover": {
            backgroundColor: "#0A3529",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#FAFAFC",
  padding: "10px",
  border: "2px solid #F0F2F6",
  borderRadius: "10px",
  marginTop: "30px",
}));

function MainPage() {
  const { height, width } = useWindowDimensions();
  const locationRef = useRef(null);

  const { user, logoutUser } = useContext(AuthContext);
  const user_id = jwt_decode(localStorage.getItem("authTokens")).user_id;

  const [bottomHeight, setBottomHeight] = useState(0);

  const setHeight = () => {
    let y_loc = locationRef.current.offsetTop;

    let topPX = Math.ceil(y_loc) + 5 + 40;
    let bottomPX = height - topPX;

    setBottomHeight(bottomPX);
  };

  useEffect(()=> {
    setHeight();
  }, [height])

  return (
    <>
      <div className="grid grid-cols-1 h-[100%] w-['100%']">
        <div className="flex mt-[1%] mb-[1%] justify-center h-[80%]">
          <div className="w-3/5 rounded-xl shadow-md ">
            <div className="">
              <div className="logoText text-center pt-2">
                <span className="theme-color">Knowledge</span>.Ai
              </div>
              <div className="absolute right-0 top-0">
                <button
                  className="bg-theme text-white m-2 px-3 py-2 rounded-lg"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="h-[20%]">
              <TextInput />
            </div>
            <div />
            <div
              ref={locationRef}
              className=" h-[70%] mt-1"
            >
              <HistoryTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { MainPage };
