import { Router } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { createUserService } from "../services/userService";
import type { Request, Response } from "express";

const router = Router();

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

router.get("/profile", checkJwt, async (req: Request, res: Response) => {
  try {
    const payload = req.auth?.payload;
    console.log("JWT payload:", payload);
    
    if (!payload) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const email = payload.email as string | undefined;
    const auth0Id = payload.sub as string | undefined;

    if (!email || !auth0Id) {
      console.warn("Missing email or sub in JWT:", { email, auth0Id });
      return res.status(400).json({ message: "Email or auth0Id missing in token" });
    }

    const localUser = await createUserService(email, auth0Id);
    console.log("Local user synced:", localUser);

    res.json({ user: localUser });
  } catch (err) {
    console.error("Profile sync error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;