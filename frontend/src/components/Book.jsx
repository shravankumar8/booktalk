// import Grid from "@mui/material/Grid";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import url from "../assets/url";
import { useNavigate } from "react-router-dom";

function Book() {
  let navigate = useNavigate();
  const [prompt, setprompt] = useState("");
  const [book, setBook] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  let textbookid = useParams();
  const [chatHistory, setChatHistory] = useState([
    `hello welcome to Booktalk you can ask what ever related to `,
  ]);

  // to fetch the initial ,book after getting the params
  // useEffect(() => {
  //   const bookId = textbookid.bookId;
  //   fetch(`${url}/getbook/${textbookid.bookId}`, {
  //     method: "POST",
  //     headers: {
  //       authorization: "bearer " + localStorage.getItem("JwtToken"),
  //       "Content-Type": " application/json",
  //     },
  //     body: JSON.stringify({
  //       bookId,
  //     }),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {});
  // });
  // console.ltextory
  useEffect(() => {
    const bookId = textbookid.bookId;
    fetch(`${url}/gethistory/${textbookid.bookId}`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("JwtToken"),
        "Content-Type": " application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // add data to chatHistory
      });
  }, []);

  function userPrompt() {
    setIsLoading(true);
    if (prompt) {
      chatHistory.push(prompt);
      setChatHistory(chatHistory);
      // console.log(chatHistory);
      fetch(`${url}/admin/course/${textbookid.bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("JwtToken"),
        },
        body: JSON.stringify({
          prompt,
        }),
      })
        .then((response) => {
          if (response.status == 403 || response.status == 404) {
            // navigate("/");
          } else {
            return response.json();
          }
        })
        .then((data) => {
            chatHistory.push(data.text);
          setChatHistory(chatHistory);
          console.log(data);
          setIsLoading(false);
          setResponse(data);
        
        });
    }
  }
  function Displayer(props) {
    return (
      <div
        style={{
          color: "white",
          border: "1px solid grey",
          borderRadius: "6px",
          margin: "10px",
          padding: "10px",
        }}
      >
        {props.text}
      </div>
    );
  }
  return (
    <>
      <div style={{}}>
        <div
          style={{
            margin: "0 auto",
            width: "43.3%",
            borderRadius: "10px",
            padding: "15px",
            marginTop: "10px",
            // minWidth: "200px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          {chatHistory.map((text, index) => {
            // console.log(chatHistory);
            return <Displayer key={index} text={text} />;
          })}
          {isloading && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "5px solid #FFF",
                    borderBottomColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    boxSizing: "border-box",
                    animation: "rotation 1s linear infinite",
                  }}
                ></div>
              </div>

              <style>
                {`
      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}
              </style>
            </>
          )}

          <div
            style={{
              margin: "0 auto",
              justifyContent: "center",
              display: "flex",
              width: "inherit",
              height: "30px",
              position: "absolute",
              bottom: "40px",
              gap: "4px",
            }}
          >
            <input
              placeholder="enter a query"
              color="black"
              onChange={(i) => {
                setprompt(i.target.value);
              }}
              style={{
                backgroundColor: "transparent",
                border: "2px solid #A4A4A4",
                fontSize: "20px",
                borderRadius: "10px",
                minHeight: "40textpx",
                width: "800px",
                padding: "20px",
                fontWeight: "bold",
                color: "#A4A4A4",
              }}
              type="text"
              name=""
              id=""
            />

            <button
              onClick={userPrompt}
              style={{
                fontSize: "15x",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                // justifyContent: "center",
                // border: "none",
                padding: "18px 18px",
                border: "2px solid #A4A4A4",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Book;
