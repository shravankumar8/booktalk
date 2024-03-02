import { useState } from "react";
import Signup from "./components/Signupp";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Signin from "./components/Signin";
import Courses from "./components/Courses";
import Course from "./components/Course";
import LandingPage from "./components/LandingPage";
import { RecoilRoot, useResetRecoilState, useSetRecoilState } from "recoil";
import InitUser from "./components/InitUser";
import Dashboard from "./components/Resources";
import CreateCourse from "./components/createCourse";
import Book from "./components/Book";
function App() {
  return (
    <>
      <RecoilRoot>
        <div className="mainDiv">
          <Router>
            <InitUser />
            <Appbar />
            <Routes>
              <Route path="/createpdf" element={<CreateCourse />} />
              <Route path="/course/:courseId" element={<Course />} />
              <Route path="/book/:bookId" element={<Book />} />

              <Route path="/courses" element={<Courses />} />

              <Route path="/published/books" element={<Dashboard />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </Router>
        </div>
      </RecoilRoot>
    </>
  );
}

export default App;

// just because harkirat singh said we have used the most ugly state management the main motto of a software engineer is never repeate yourself but
// /but the app which we built is the least fking effecient
// to make this effecient in state management we have two methods we can use global methods to verify the user auth
// and another efficient way is to use external libraries and apis
//1. one method is to create a global top level state where all the components use that that instead of getting values each time
// but the disadvantage of this is that all the components rerender everything rerenders no matter which state is changed
// 2.another method is to use a library such as use contect of another hooks or recoil
