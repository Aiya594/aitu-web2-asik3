const express = require("express");
const Blog = require("../models/blog");
const blogPost = require("../models/blog");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, body, author } = req.body;

  if (!title || !body) {
    return res.status(400).json({
      error: "title and body are required",
    });
  }

  try {
    const blog = new blogPost({ title, body, author });
    const savedPost = await blog.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: "database error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await blogPost.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "database error" });
  }
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    const blog = await blogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: "invalid ID format" });
  }
});


router.put("/:id", async (req, res) => {
  const { title, body, author } = req.body;

  if (!title || !body) {
    return res.status(400).json({
      error: "title and body are required",
    });
  }

  try {
    const updatedPost = await blogPost.findByIdAndUpdate(
      req.params.id,
      { title, body, author },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "blog not found" });
    }

    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: "invalid ID format" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await blogPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ error: "blog not found" });
    }

    res.json({ message: "blog deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "invalid ID format" });
  }
});

module.exports = router;