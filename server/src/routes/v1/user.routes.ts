import express from "express";

import {
  authUser,
  registerNewUser,
  logoutUser,
  getUserProfileByID,
  updateUserProfileById,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
} from "../../controllers/user.controller.js";
import { validateAdmin, validateUser } from "../../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(validateUser, validateAdmin, getAllUsers)
  .post(registerNewUser)
  .put()
  .delete();

router
  .route("/profile")
  .get(validateUser, validateAdmin, getUserProfileByID)
  .post()
  .put(updateUserProfileById)
  .delete();

router
  .route("/:id")
  .get(validateUser, validateAdmin, getUserByID)
  .post()
  .put(validateUser, validateAdmin, updateUser)
  .delete(validateUser, validateAdmin, deleteUser);

router.post('/login', authUser);
router.post('/logout', logoutUser);

export default router;