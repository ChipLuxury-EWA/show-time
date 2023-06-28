import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
    res.send("server is running...");
});
export default router;
