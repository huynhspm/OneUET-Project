const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./database");
const models = require("./database/models");
const router = require("./api");

const app = express();
var cors = require("cors");

const createData = require("./utils/data");

const init = async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use(cors());

  app.use("/api", router);
  // app.use(express.static("build"));

  // app.get("/*", function (req, res) {
  // 	res.sendFile("build/index.html", { root: "." });
  // });

  await sequelize.sync();
  console.log("Finish load database.");

  // await createData();
  console.log("Create data successfully");
};

init();

module.exports = app;

// token admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4
// token user: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE2NzA0ODk2NDgsImV4cCI6MTY3MzA4MTY0OH0.kKVgxO566QaVpvGbqtKBmr_I_Sl8RSlEk8Nhr-GWM74
