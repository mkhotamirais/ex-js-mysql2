import express from "express";
import "dotenv/config";
import db from "./config/db.js";
import { corsOptions, credentials } from "./middleware.js";
import cors from "cors";
import "dotenv/config";

import router from "./app/router.js";

const app = express();

const port = process.env.PORT || 3001;
const dbName = process.env.NODE_ENV === "production" ? process.env.DB_NAME_PROD : process.env.DB_NAME;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("ex-js-mysql22");
});

app.use("/api", router);

db.getConnection()
  .then(() => {
    app.listen(port, () => console.log(`Connect to ${dbName} and running on http://localhost:${port}`));
  })
  .catch((err) => console.error("Error connecting to the database:", err.message));
