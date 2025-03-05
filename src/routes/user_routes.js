import { Router } from "express";

const router = Router();

router.route("/").get();

router.route("/register").post();

router.route("/login").post();

router.route("/:userID").get().update().delete();

export default router;
