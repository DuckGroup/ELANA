import express from "express";
import { auth as jwtCheck } from "express-oauth2-jwt-bearer";
import { connectDB, prisma } from "./db";
import dotenv from "dotenv";
import { connectRabbitMQ } from "./src/repository/rabbitmq";
import productRouter from "./src/routes/productRoutes";
import userRouter from "./src/routes/userRoutes";
import authRouter from "./src/routes/authRoutes";
import orderRouter from "./src/routes/orderRoutes";
import cors from "cors";

// Lägga in autentisering i backend
// Användare skapas ej i db efter första inlogg/registrering
// Ska ha roles
// En unik bransch som publiceras vid commit (refactor-0.1)
// https://elana-1.onrender.com <-- publika backend url

dotenv.config({
  debug: false,
});

connectDB();
const app = express();
const port = parseInt(process.env.PORT || "3013", 10);
const ALLOWED = process.env.ALLOWED_ORIGIN!;
const host = "0.0.0.0";

app.use(express.json());
//connectRabbitMQ();

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

const checkJwt = jwtCheck({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
  jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`,
});

app.use(checkJwt)

app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
