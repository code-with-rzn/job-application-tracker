const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(function() {
        console.log("Connected to MongoDB");
    })
    .catch(function(error) {
        console.error("MongoDB connection error:", error);
    });

// Application Schema
const applicationSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },

    jobTitle: {
        type: String,
        required: true
    },

    location: {
        type: String,
        default: ""
    },

    applicationDate: {
        type: String,
        default: ""
    },

    salary: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        default: "Applied"
    }
});

// Application Model
const Application = mongoose.model("Application", applicationSchema);

// Home route
app.get("/", function(req, res) {
    res.send("Job Application Tracker API is running!");
});

// GET - Get all applications
app.get("/api/applications", async function(req, res) {
    try {
        const applications = await Application.find();

        res.json(applications);
    } catch (error) {
        res.status(500).json({
            message: "Error getting applications"
        });
    }
});

// POST - Add application
app.post("/api/applications", async function(req, res) {
    try {
        const application = new Application(req.body);

        const savedApplication = await application.save();

        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({
            message: "Error adding application"
        });
    }
});

// PUT - Update application
app.put("/api/applications/:id", async function(req, res) {
    try {
        const id = req.params.id;

        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedApplication) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json(updatedApplication);

    } catch (error) {
        res.status(500).json({
            message: "Error updating application"
        });
    }
});

// DELETE - Delete application
app.delete("/api/applications/:id", async function(req, res) {
    try {
        const id = req.params.id;

        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            message: "Application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting application"
        });
    }
});

// Start server
app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});