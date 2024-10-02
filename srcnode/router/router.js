// routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const Projects = require("../models/Projects");

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
router.post('/projects', async (req, res) => {
    const { name, details, link, code, imgLink } = req.body;
    
    const newProject = new Projects({
        name,
        details,
        link,
        code,
        imgLink
    });

    try {
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'Error creating project' });
    }
});

// GET: Retrieve all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Projects.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching projects' });
    }
});
router.put('/projects/:id', async (req, res) => {
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
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.json({
        message: 'Project updated successfully',
        project: updatedProject,
      });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.delete('/projects/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProject = await Projects.findByIdAndDelete(id);
      
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting project', error });
    }
  });
  
  
module.exports = router;
