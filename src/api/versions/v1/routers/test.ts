import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: `Thanks for stopping by test version 1` }); // Change or remove this if you want to.
});

module.exports = router; // Never do export default router, that won't work, just keep doing the safe module.exports = router method.
