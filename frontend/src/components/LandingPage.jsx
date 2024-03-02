import Button from "@mui/material/Button";
import * as React from "react";
import { Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userEmailState } from "../store/selectors/username";

import {
  RecoilRoot,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
const LandingPage = () => {
  // const navigate = useNavigate();
  return (
    <>
      <Grid
        container
        style={{ display: "flex", justifyContent: "center", padding: "5vw" }}
      >
        <Grid item xs={12} md={6} lg={7}>
          <div className="sodisollu" style={{ marginTop: "70px" }}>
            <Typography color={"white"} variant={"h2"}>
              Welcome to BookTalk
              
            </Typography>
            <Typography color={"white"} variant={"h5"}>
              Your Interactive Study Companion
            </Typography>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <div className="signupdiv" style={{ marginRight: "10px" }}>
                <Buttond />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item style={{ alignItems: "center" }} xs={12} md={6} lg={5}>
          <div style={{ width: "40", marginTop: "50px" }}>
            <img
              style={{ maxInlineSize: "100%", blockSize: "auto," }}
              src="https://www.classcentral.com/report/wp-content/uploads/2022/10/udemy-personal-plan-expands-banner.png"
              alt=""
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default LandingPage;
function Buttond() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);

  if (userEmail) {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={() => {
            navigate("/courses");
          }}
          variant="contained"
        >
          courses
        </Button>
        <Button
          onClick={() => {
            navigate("/createcourse");
          }}
          variant="contained"
        >
          create course
        </Button>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={() => {
            navigate("/signup");
            console.log("hello world");
          }}
          variant="contained"
        >
          Signup
        </Button>

        <Button
          onClick={() => {
            navigate("/signin");
          }}
          variant="contained"
        >
          Signin
        </Button>
      </div>
    );
  }
}
