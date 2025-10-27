import { Router } from "express";
import { requiresAuth } from "express-openid-connect";

const router = Router();

router.get("/profile", requiresAuth(), (req, res) => {
  res.send(req.oidc.user);
});

export default router;
