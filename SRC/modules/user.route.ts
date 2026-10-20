import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post("/", userController.createUser);
router.get("/",userController.getAllusers)
router.get('/:id',userController.getSingleUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.updateUser);

export  const userRouter = router;
