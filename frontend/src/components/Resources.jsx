import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atom/admin";
import { userEmailState } from "../store/selectors/username";
import { useEffect, useState } from "react";
import url from "../assets/url";
function Dashboard() {
  let navigate = useNavigate();
  const [resources, setResources] = React.useState([]);
  useEffect(() => {
    fetch(`${url}/admin/courses`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("JwtToken"),
      },
    })
      .then((response) => {
        if (
          response.status == 403 ||
          response.status == 404 ||
          response.status === 401
        ) {
          navigate("/");
        }

        return response.json();
      })
      .then((data) => {
        //    data=JSON.stringify(data);
        setResources(data.resources);
      });
  }, []);

  useEffect(() => {
    fetch(`https://localhost:3000`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("JwtToken"),
      },
    })
      .then((response) => {
        if (
          response.status == 403 ||
          response.status == 404 ||
          response.status === 401
        ) {
          navigate("/");
        }

        return response.json();
      })
      .then((data) => {
        //    data=JSON.stringify(data);
        // setResources(data.resources);
      });
  }, []);

  const userEmail = useRecoilValue(userEmailState);
  if (userEmail) {
    // <div
    //     style={{
    //       color: "white",
    //       display: "flex",
    //       justifyContent: "center",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
    //     {courses.map((course) => {
    //       return <Course course={course} />;
    //     })}
    //   </div>
    return (
      <Grid
        margin={2}
        container
        spacing={3}
        style={{ color: "white", alignItems: "center" }}
      >
        {resources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Resource resource={resource} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
function Resource(props) {
  let navigate = useNavigate();
  console.log(props);
  return (
    <Card
      onClick={() => {
        navigate(`/book/${props.resource._id}`);
      }}
      sx={{ marginBottom: "20px", maxWidth: 335 }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={props.resource.imageLink}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.resource.title}
            hiii
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.resource.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default Dashboard;
