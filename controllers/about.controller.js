import About from "../models/about.model.js";
import fs from "fs";
import path from "path";

export const createAbout = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        if (!title || !description) {
            return res.status(400).json({ 
                success: false, 
                message: "Title and description are required" 
            });
        }

        const newAbout = new About({ title, description, image });
        await newAbout.save();

        res.status(201).json({ 
            success: true, 
            message: "About section created successfully", 
            data: newAbout 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const getAbout = async (req, res) => {
    try {
        const about = await About.find();
        res.status(200).json({ 
            success: true, 
            data: about 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const updateAbout = async (req, res) => {
    try {
        const { title, description } = req.body;
        const about = await About.findById(req.params.id);
        if (!about) {
            return res.status(404).json({ 
                success: false, 
                message: "About section not found" 
            });
        }

        // Delete old image if a new one is uploaded
      // Delete old image if a new one is uploaded
      if (req.file && about.image) {
        const oldImagePath = path.join("uploads", path.basename(about.image));
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
    }

        // Update fields
        about.title = title || about.title;
        about.description = description || about.description;
        about.image = req.file ? `/uploads/${req.file.filename}` : about.image; 

        await about.save();

        res.status(200).json({
            success: true,
            message: "About section updated successfully",
            data: about
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const deleteAbout = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        if (!about) {
            return res.status(404).json({ 
                success: false, 
                message: "About section not found" 
            });
        }

       
        if (about.image) {
            const imagePath = path.join("uploads", path.basename(about.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await About.findByIdAndDelete(req.params.id);
        res.status(200).json({ 
            success: true,
            message: "About section deleted successfully" 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};
