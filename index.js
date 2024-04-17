import express from "express";
import router from "./Routes/mainRouter.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("USER SERVICE STARTED AT PORT " + PORT);
});
