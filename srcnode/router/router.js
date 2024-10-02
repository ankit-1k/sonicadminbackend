// routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const Projects = require("../models/Projects");
const News = require("../models/News");
const Blog = require("../models/Blog");

const router = express.Router();

// Register route to store user data in the database
// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     // Create new user
//     const newUser = new User({ username, password });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Login route to authenticate user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/projects", async (req, res) => {
  const { name, details, link, code, imgLink } = req.body;

  const newProject = new Projects({
    name,
    details,
    link,
    code,
    imgLink,
  });

  try {
    await newProject.save();
    res.status(201).json({ message: "Project created successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error creating project" });
  }
});

// GET: Retrieve all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
});
router.put("/projects/:id", async (req, res) => {
  const { id } = req.params; // Extract project ID from URL params
  const { name, details, link, code, imgLink } = req.body; // Extract updated data from request body

  try {
    // Find the project by ID and update it
    const updatedProject = await Projects.findByIdAndUpdate(
      id,
      { name, details, link, code, imgLink },
      { new: true } // This option ensures the returned document is the updated one
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Projects.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
});

router.post("/news", async (req, res) => {
  try {
    const newsItem = new News(req.body);
    await newsItem.save();
    res
      .status(201)
      .json({ message: "News item created successfully", newsItem });
  } catch (error) {
    console.error("Error creating news item:", error);
    res.status(500).json({ message: "Failed to create news item" });
  }
});

// Fetch All News
router.get("/news", async (req, res) => {
  try {
    const newsItems = await News.find();
    res.status(200).json(newsItems);
  } catch (error) {
    console.error("Error fetching news items:", error);
    res.status(500).json({ message: "Failed to fetch news items" });
  }
});

// Update News by ID
router.put("/news/:id", async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedNews) {
      return res.status(404).json({ message: "News item not found" });
    }
    res
      .status(200)
      .json({ message: "News item updated successfully", updatedNews });
  } catch (error) {
    console.error("Error updating news item:", error);
    res.status(500).json({ message: "Failed to update news item" });
  }
});

// Delete News by ID
router.delete("/news/:id", async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News item not found" });
    }
    res.status(200).json({ message: "News item deleted successfully" });
  } catch (error) {
    console.error("Error deleting news item:", error);
    res.status(500).json({ message: "Failed to delete news item" });
  }
});

// Get all blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new blog
router.post("/blogs", async (req, res) => {
  const { name, content, publisherName, publishDate, link } = req.body;

  const blog = new Blog({
    name,
    content,
    publisherName,
    publishDate,
    link,
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json({ message: "Blog created successfully", savedBlog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a blog
router.put("/blogs/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog
router.delete("/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
