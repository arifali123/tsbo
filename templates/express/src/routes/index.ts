import { Router } from "express";
import hi from "./hi";
const router = Router();
router.use(hi);
export default router;
