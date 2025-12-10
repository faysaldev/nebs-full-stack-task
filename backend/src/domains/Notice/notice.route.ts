import { Router } from "express";
import dataController from "./notice.controller";

const router = Router();

router.get("/all", dataController.getAllData);

export default router;
