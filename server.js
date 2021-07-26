import express from "express";
import connectDB from "./config/dbconfig";
connectDB();
import { APP_PORT, DEBUG_MODE } from "./config/index";
import route from "./routes/index";
import errorHandler from "./middlewares/errorHandler";

const app = express();

//@route handling
app.use(express.json());
app.use("/api/", route);
app.use(errorHandler);
// @creating the server using express
app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`);
});
