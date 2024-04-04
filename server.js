const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const mongoDb = require("./config/config.js");

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 6000,
    },
  })
);
//Basic express session initialization
app.use(passport.initialize());
//Allow passport to use express session
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader(
    "Access-Control-Headers",
    "Origin, x-Requested-With, Content-Type, Accept, Accept z-key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH,  OPTIONS, DELETE"
  );

  next();
});

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(cors({ origin: "*" }));

app.use("/", require("./routes")
)

mongoDb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`App is listening at port ${port}`);
    });
  }
});