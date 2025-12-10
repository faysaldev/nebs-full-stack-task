import { Router } from "express";
import dataRoutes from "../domains/Notice/notice.route";
// Initialize the router
const router = Router();

router.use("/notice", dataRoutes);

export default router;
