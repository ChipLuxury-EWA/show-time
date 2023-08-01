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

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(registerNewUser)
  .put()
  .delete();

router
  .route("/profile")
  .get(getUserProfileByID)
  .post()
  .put(updateUserProfileById)
  .delete();

router
  .route("/:id")
  .get(getUserByID)
  .post()
  .put(updateUser)
  .delete(deleteUser);

router.post('/login', authUser);
router.post('/logout', logoutUser);

export default router;