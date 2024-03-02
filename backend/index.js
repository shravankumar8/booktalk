const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });
app.use(cors());
app.use(express.json());
const zodUserInputValidation = require("zod-user-input-validation");
let port = 3000;

// define mongoose schemas
// admins schema

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});
const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageLink: String,
    published: Boolean,
    fileName: String,
  },
  { timestamps: true }
);
const chatHistorySchema = new mongoose.Schema({
  userid: String,
  bookid: String,
  question: String,
  answer: String,
});

const History = mongoose.model("History", chatHistorySchema);
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
mongoose.connect(
  "mongodb+srv://kumashravan5:8Piz3bZ9jNpMkAJq@cluster0.t8zf1dw.mongodb.net/booktalk"
);

// Admin routes

var jwtKeyAdmin = "provenworksAdmin";
function generateJwt(username) {
  const payload = { username };
  return (token = jwt.sign(payload, jwtKeyAdmin, { expiresIn: "1h" }));
}

function authenticateJwtAdmin(req, res, next) {
  authHeader = req.headers.authorization;

  if (authHeader) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, jwtKeyAdmin, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "unable to verify user" });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401).json({ message: "Admin not found bro !" });
  }
}
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const userInput = await zodUserInputValidation.inputvalidation(
    username,
    password
  );
  if (userInput.success) {
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(403).json({ message: " Admin already exists" });
    } else {
      const newAdmin = new Admin({ username: username, password: password });
      await newAdmin.save();
      let token = generateJwt(username);
      res.status(200).json({ message: " Admin created successfully", token });
    }
  } else {
    res.status(400).json({ message: userInput.error.errors[0].message });
  }
});

// console.log(username,password)

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.headers;
  const userInput = await zodUserInputValidation.inputvalidation(
    username,
    password
  );
  if (userInput.success) {
    admin = await Admin.findOne({ username: username, password: password });
    if (admin) {
      let token = generateJwt(username);
      res.json({ message: "Login successful", token });
    } else {
      res.status(403).json({ message: "Admin authentication failed" });
    }
  } else {
    res.status(400).json({ message: userInput.error.errors[0].message });
  }
});

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
app.post(
  "/admin/courses",
  authenticateJwtAdmin,
  upload.single("file"),
  async (req, res) => {
    console.log(req.file);
    if (!req.file) {
      return res.send("no file recived");
    }
    let obj = {
      title: req.body.title,
      description: req.body.description,
      imageLink: req.body.imageLink,
      published: req.body.published,
      fileName: req.body.fileName,
    };
    const course = await new Course(obj);
    await course.save();

    console.log(req.file);

    // ########################################################
try {
  const FormData = require("form-data");
  const fs = require("fs");
  let data = new FormData();
  data.append(
    "file",
    fs.createReadStream(
      `/home/gitstar/Desktop/github_repos/booktext/backend/images/${req.body.fileName}`
    )
  );

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:5000/newpdf",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
} catch (error) {
  console.log(error)
  
}

    // ########################################################


    // console.log(req.body.title);
    
    // console.log(req.file);

    res.json({ message: "the book is saved succesfully" });
    // res.json({ message: " cource created succesfully ", courseId: course.id });
  }
);
app.get("/profile/me", authenticateJwtAdmin, async (req, res) => {
  res.json({ username: req.user.username });
});
app.put(
  "/admin/courses/:textbookid",
  authenticateJwtAdmin,
  async (req, res) => {
    // logic to edit a course
    console.log(req.params.textid);
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      {
        new: true,
      }
    );
    await course.save();
    if (course) {
      res.json({ message: "course updated successfully" });
    } else {
      res.status(404).json({ message: "course not found" });
    }
  }
);

app.get("/admin/courses", authenticateJwtAdmin, async (req, res) => {
  const resources = await Course.find({});
  return res.json({ resources });
});
// ############################################################################################################################
// main code to interact with the AI

app.post(
  "/admin/course/:textbookid",
  authenticateJwtAdmin,
  async (req, res) => {
    try {
      const textbookid = req.params.textbookid;
      
      // console.log(courseId);
      const query = req.body.prompt;

      const book = await Course.findById(textbookid);
      console.log(book.fileName,query);

      if (book.fileName) {
        

        // #############################################################
        try {
          const axios = require("axios");
          let data = JSON.stringify({
            query: query,
            pdfName: book.fileName,
          });

          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://127.0.0.1:5000/query_pdf",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
                return res.json({
                  text: response.data.answer
                });
            })
            .catch((error) => {
              console.log(error);
            });


        } catch (error) {
          
        }
        // #############################################################

        
      } else {
        return res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/gethistory/:bookId", authenticateJwtAdmin, async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const username = req.user.username;
    const admin = await Admin.findOne({ username });
    const userid = admin._id;

    const history = await History.find({
      bookid: bookId,
      userid: userid,
    }).lean();

    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User routes

app.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
