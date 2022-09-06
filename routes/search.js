import { Router } from "express";
import { searchController } from "../controllers/search.js";

const router = Router();

router.get("/:term/:collection", searchController);

export default router;
