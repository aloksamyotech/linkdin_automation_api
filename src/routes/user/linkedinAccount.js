import LinkedinController from "../../controllers/linkedinController.js";
import { Router } from "express";
import { asyncHandler } from "../../utils/asyncWrapper.js";
const router = Router();

router.post('/connect-account',asyncHandler(LinkedinController?.connectLinkedinAccount));
router.get('/getLinkedInAccount',asyncHandler(LinkedinController?.getLinkedinAccount));
router.get('/getLinkedInAccountByUserId/:userId',asyncHandler(LinkedinController?.getLinkedinAccountByUserId));
router.get('/getLinkedInAccountById/:id',asyncHandler(LinkedinController?.getLinkedinAccountById));
router.post('/updateOtp/:id',asyncHandler(LinkedinController.updateOtp));
router.put("/updateStatus/:id",asyncHandler(LinkedinController.updateStatus));
router.get("/getOtp/:id",asyncHandler(LinkedinController.getOtp));
router.get("/getPaginatedData",asyncHandler(LinkedinController.getPaginatedData));

export default router;