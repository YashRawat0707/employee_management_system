import express from "express";
import Performance from "../models/Performance.js";

const router = express.Router();

// Add review
router.post("/add", async (req, res) => {
  try {
    const review = new Performance(req.body);
    await review.save();
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error adding review" });
  }
});

// Get reviews of an employee
router.get("/:employeeId", async (req, res) => {
  try {
    const reviews = await Performance.find({ employeeId: req.params.employeeId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

export default router;
