import "dotenv/config";
import express from "express";
import path from "path";

const __dirname = import.meta.dirname;
const app = express();
const PORT = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// import skillRouter from "./modules/skills/router.js";
import adminRouter from "./modules/projects/router.js";


// app.use("/skill", skillRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
