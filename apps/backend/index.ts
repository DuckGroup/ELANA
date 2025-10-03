// apps/api/index.ts
import express from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import connectDB from './db';
import dotenv from "dotenv";


dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 3012;




const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});