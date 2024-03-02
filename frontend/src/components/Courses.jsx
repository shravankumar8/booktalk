import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import url from '../assets/url'
import Appbar from "./Appbar";
import { useNavigate } from "react-router-dom";
function Courses() {
   let navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(`${url}/admin/courses`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("JwtToken"),
      },
    })
      .then((response) => {
        if(response.status==403 || response.status==404|| response.status===401) {
          navigate("/")
        }

        return response.json()
      
      })
      .then((data) => {
        //    data=JSON.stringify(data);
        setCourses(data.courses);
      });
  }, []);
  return (
    <>
      <divcourses
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {courses.map((course) => {
          return <Course course={course} />;
        })}
      </divcourses>
    </>
  );
  function Course(props) {
    return (
      <Card
      onClick={()=>{
        navigate(`/course/${props.course._id}`);

      }}
        style={{
          margin: 10,
          width: "70%",
          padding: "10px",
          paddingTop: "20px",
          minHeight: 10,
          display: "flex",
        
        }}
      >
        <div className="imageDiv">
          <img
            src={props.course.imageLink}
            style={{
              width:"300px",
              maxWidth: "300px",
              maxHeight: "140px",
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
            {props.course.title}
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
            {props.course.description}
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
            {props.course.userName}
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
              {props.course.price + 10 + "$"}
            </div>
            <div
              style={{
                fontSize: "14px",
              }}
            >
              {props.course.price + "$"}
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
            {props.course.published ? (
              <p>Status: Published</p>
            ) : (
              <p>Status: Not Published</p>
            )}
          </div>
            
        </div>
      </Card>
      
    );
  }
}
export default Courses;
