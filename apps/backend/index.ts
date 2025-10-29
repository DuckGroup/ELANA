import express from "express";
import { connectDB } from "./db";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import { connectRabbitMQ } from "./src/repository/rabbitmq";
import productRouter from "./src/routes/productRoutes";
import userRouter from "./src/routes/userRoutes";
import authRouter from "./src/routes/authRoutes";
import orderRouter from "./src/routes/orderRoutes";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();
const port = parseInt(process.env.PORT || "3012", 10);
const ALLOWED = process.env.ALLOWED_ORIGIN!;
const host = "0.0.0.0";

app.use(express.json());
connectRabbitMQ();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedList = ALLOWED.split(",").map((s) => s.trim());
      if (ALLOWED === "*" || allowedList.includes(origin))
        return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    exposedHeaders: ["Content-Range", "X-Total-Count"],
  })
);

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/users", checkJwt, userRouter);
app.use("/orders", checkJwt, orderRouter);
app.use("/auth", checkJwt, authRouter);

app.get("/profile", checkJwt, (req, res) => {
  res.json({ 
    message: "Authenticated",
    user: req.auth?.payload 
  });
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});