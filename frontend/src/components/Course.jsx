import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import url from "../assets/url";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
function Course() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [published, setPublished] = useState(true);
  const [imageLink, setImageLink] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState(null);
  const [course, setCourse] = useState("");
  let navigate = useNavigate();
  let { courseId } = useParams();
    useEffect(() => {
      if (courseId) {
        fetch(`${url}/admin/course/${courseId}`, {
          // http://192.168.29.52:3000/admin/course/65b8f951b6158fe2ba9b616c
          method: "GET",
          headers: {
            authorization: "bearer " + localStorage.getItem("JwtToken"),
          },
        })
          .then((response) => {
            if (response.status == 403 || response.status == 404) {
              navigate("/");
            } else {
              return response.json();
            }
          })
          .then((data) => {
            setCourse(data.course);
          });
      }
    }, [courseId]);
  return (
    <>
      <div style={{ color: "white" }}></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            display: "flex",
            margin: "20px",
            width: "40vw",
            padding: "20px",
            paddingTop: "20px",
          }}
        >
          <div></div>
          <div className="imageDiv">
            <img
              src={course?.imageLink}
              style={{
                width: "250px",
                marginRight: "10px",
              }}
              alt=""
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="sodiDiv"
          >
            <div
              style={{
                textTransform: "uppercase",

                display: "block",
                fontFamily: "sans-serif",
                fontSize: "16px",
                fontWeight: "700",
                textWrap: "wrap",
              }}
            >
              {course?.title}
            </div>
            <div
              style={{
                fontSize: "14px",
                lineHeight: "19.6px",
                marginTop: "10px",
                textWrap: "wrap",
                fontWeight: "400",
                marginButton: "4px",
              }}
              className="description"
            >
              {course?.description}
            </div>
            <div
              style={{
                marginTop: "10px",
                color: "rgb(106, 111, 115)",
                fontSize: "12px",
                fontWeight: "400",
              }}
              className="admin"
            >
              {course?.userName}
            </div>
            <div
              style={{
                marginTop: "10px",
                // color: "grey",
                fontSize: "16px",
                fontWeight: "700",
                display: "flex",
                gap: "10px",
              }}
              className="admin"
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#6a6f73",
                  textDecoration: "line-through",
                }}
              >
                {course?.price + 10 + "$"}
              </div>
              <div
                style={{
                  fontSize: "14px",
                }}
              >
                {course?.price + "$"}
              </div>
            </div>
            <div
              style={{
                marginTop: "10px",
                // color: "grey",
                fontSize: "16px",
                fontWeight: "700",
              }}
              className="admin"
            >
              {course?.published ? (
                <p>Status: Published</p>
              ) : (
                <p>Status: Not Published</p>
              )}
            </div>
          </div>
        </Card>
        <div>
          <div>
            <Typography style={{ color: "white", fontSize: "20px" }}>
              Edit the course below
            </Typography>
          </div>
          <Card
            style={{
              display: "flex",
              padding: 40,
              width: "700px",
              gap: "10px",
              marginBottom: "30px",
              flexDirection: "column",
            }}
            className="input-card"
          >
            <TextField
              onChange={(i) => {
                setCourseTitle(i.target.value);
                course.title = i.target.value;
              }}
              value={course?.title}
              label="Title"
              variant="outlined"
              f
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              onChange={(i) => {
                setCourseDescription(i.target.value);
                course.description = i.target.value;
              }}
              value={course?.description}
              label="course Description"
              id="outlined-number"
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              onChange={(i) => {
                setCoursePrice(i.target.value);
                course.price = i.target.value;
              }}
              value={course?.price}
              label="Price"
              id="outlined-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              value={course?.imageLink}
              onChange={(i) => {
                setImageLink(i.target.value);
                course.imageLink = i.target.value;
              }}
              label="Image Link"
              id="outlined-number"
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
              Select to publish{" "}
              <Checkbox
                onChange={(e) => {
                  setPublished(e.target.checked);
                  course.published = e.target.checked;
                }}
                {...label}
                defaultChecked
              />
            </div>
            <Button
              variant="contained"
              onClick={() => {
                // console.log(localStorage.getItem("JwtToken"));

                // 192.168.29.52:3000/admin/courses/65b92e576427266e5aab7145
                http: fetch(`${url}/admin/courses/${courseId}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    authorization:
                      "bearer" + " " + localStorage.getItem("JwtToken"),
                  },
                  body: JSON.stringify({
                    title: course.title,
                    description: course.description,
                    price: course.price,
                    imageLink: course.imageLink,
                    published: course.published,
                  }),
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
              Update
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
export default Course;
