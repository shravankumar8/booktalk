import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import url from "../assets/url";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atom/admin";
import { userEmailState } from "../store/selectors/username";
import { isLoadingState } from "../store/selectors/isLoading";
// import Button from "@mui/material/Button";

function Appbar() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const setuserState = useSetRecoilState(userState);
  const isLoading = useRecoilValue(isLoadingState);
  // Get the full URL including query parameters and hash

  // Get the path part of the URL (excluding domain, query parameters, and hash)
  // console.log(currentPath);
  if (userEmail) {
    return (
      <>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#0F0E0E",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              style={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
            >
              BookTalk
            </Typography>
          </div>
          <Button
            onClick={() => {
              navigate("/published/books");
            }}
            variant="contained"
          >
            view books
          </Button>
          <Button
            onClick={() => {
              navigate("/createpdf");
            }}
            variant="contained"
          >
            create pdf
          </Button>
          <div style={{ display: "flex" }}>
            <div>
              {" "}
              <Typography style={{ color: "white" }}>{userEmail}</Typography>
            </div>
            <div style={{ marginRight: "2px", marginLeft: "20px" }}>
              <Button
                onClick={() => {
                  localStorage.setItem("JwtToken", null);
                  navigate("/");
                  setuserState({
                    isLoading: false,
                    userMail: null,
                  });
                }}
                variant="contained"
              >
                logout
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          backgroundColor: "#0F0E0E",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <Typography
            style={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
          >
            BookTalk
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <Button
              style={{ padding: "10px" }}
              onClick={() => {
                navigate("/signup");
              }}
              variant="contained"
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              style={{ padding: "10px" }}
              onClick={() => {
                navigate("/signin");
              }}
              variant="contained"
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Appbar;
