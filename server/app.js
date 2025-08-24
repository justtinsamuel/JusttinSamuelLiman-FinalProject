require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const base = "api";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/${base}`, routes);

module.exports = app;
