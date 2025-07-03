import "dotenv/config";
import express from "express";
import path from "path";

const __dirname = import.meta.dirname;
const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Import and mount admin router handling project and skill management routes under /admin
import adminRouter from "./modules/projects/router.js";

app.use("/admin", adminRouter);

// Start the server and listen on configured port
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
