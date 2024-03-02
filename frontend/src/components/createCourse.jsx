import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Appbar from "./Appbar";

import url from "../assets/url";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

import * as React from "react";
// import { styled } from "@mui/material/styles";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [published, setPublished] = useState(true);
  const [imageLink, setImageLink] = useState("");
  const [file, setFile] = useState(null);
  function handleUpload(event) {
    let file = event.target.files[0];
    setFile(file);
  }
  let navigate = useNavigate();
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "60px",
            marginBottom: "10px",
            color: "white",
            // text,
          }}
        >
          <Typography style={{ fontSize: "20px" }}>
            Dream Admin create Course below
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card varint={"outlined"} style={{ width: 400, padding: 40 }}>
            <TextField
              onChange={(i) => {
                setCourseTitle(i.target.value);
              }}
              label="Title"
              variant="outlined"
              fullWidth={true}
            />
            <br />
            <br />
            <TextField
              onChange={(i) => {
                setCourseDescription(i.target.value);
              }}
              label="Description"
              variant="outlined"
              fullWidth={true}
            />
            <br />
            <br />

            <br />
            <br />
            <TextField
              onChange={(i) => {
                setImageLink(i.target.value);
              }}
              label="Image Link"
              id="outlined-number"
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button
              onClick={() => {
                console.log(file);
              }}
            >
              egfvrgvrwgv
            </button>
            <br />

            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Select to publish{" "}
              <Checkbox
                onChange={(e) => {
                  setPublished(e.target.checked);
                }}
                {...label}
                defaultChecked
              />
            </div>
            <Button
              variant="contained"
              onClick={() => {
                // console.log(localStorage.getItem("JwtToken"));
                const formData = new FormData();
                formData.append("file", file);
                formData.append("title", courseTitle);
                formData.append("description", courseDescription);
                formData.append("imageLink", imageLink);
                formData.append("published", published);
                formData.append("fileName", file.name);
                console.log(file.name)

                fetch(`${url}/admin/courses`, {
                  method: "POST",
                  headers: {
                    authorization:
                      "bearer" + " " + localStorage.getItem("JwtToken"),
                  },
                  body: formData,
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    // alert(data)
                    console.log(data);
                    alert(data.message);
                  });
              }}
            >
              Create
            </Button>

            <br />
            <br />
          </Card>
        </div>
      </div>
    </>
  );
}
export default CreateCourse;
