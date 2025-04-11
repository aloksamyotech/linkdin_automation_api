import { Router } from "express";
import ActionController from "../../controllers/action.js";
import { asyncHandler } from "../../utils/asyncWrapper.js";
const router = Router();

router.post('/createAction',asyncHandler(ActionController.createAction));
router.get('/getActions',asyncHandler(ActionController.getActionData));
router.put('/updateAction/:id',asyncHandler(ActionController.updateAction));
router.delete('/deleteAction/:id',asyncHandler(ActionController.deleteAction));

export default router;
