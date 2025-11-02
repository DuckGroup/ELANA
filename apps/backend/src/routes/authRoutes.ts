import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import { createUserService } from "../services/userService";
// add requireAuth later
const router = Router();

router.get("/profile", requiresAuth(), async (req, res) => {
  try {
    const profile = req.oidc?.user;
    console.log("OIDC profile:", profile);
    if (!profile) return res.status(401).send("Not authenticated");

    const email = profile.email as string | undefined;
    const auth0Id = profile.sub as string | undefined;

    if (!email || !auth0Id) {
      console.warn("Missing email or sub in profile:", { email, auth0Id });
      return res.status(400).json({ message: "Email or auth0Id missing in profile" });
    }

    const localUser = await createUserService(email, auth0Id);
    console.log("Local user synced:", localUser);

    res.json({ user: localUser });
  } catch (err) {
    console.error("Profile sync error:", err);
    res.status(500).send("Server error");
  }
});

export default router;