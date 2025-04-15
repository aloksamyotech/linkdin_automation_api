import { Router } from "express";
import ListController from "../../controllers/listController.js";
import { asyncHandler } from "../../utils/asyncWrapper.js";
const router = Router();

router.post("/createList",asyncHandler(ListController.createList));
router.get("/getListByUserId/:userId",asyncHandler(ListController.getListByUserId));
router.put("/updateList/:id",asyncHandler(ListController.updateList));
router.get("/getPaginatedList",asyncHandler(ListController.getPaginatedData));

export default router;
