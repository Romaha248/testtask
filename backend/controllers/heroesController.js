import Superhero from '../models/heroes.js';
import cloudinary from '../utils/cloudinary.js';
import { validationResult } from 'express-validator';
import getEncodedPublicId from '../utils/cloudinaryHelpers.js';


export const getAllHeroes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;

        const total = await Superhero.countDocuments();
        const heroes = await Superhero.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            heroes,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error("Error saving hero:", error);
        res.status(500).json({ message: "Failed to find heroes", error: error });
    }
}

export const createHero = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const uploadedImages = req.files || [];

    if (uploadedImages.length === 0) {
        return res.status(400).json({ message: 'At least one image must be uploaded' });
    }
    try {
        const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

        const imageUploads = await Promise.all(
            req.files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: 'testtask', transformation: [
                        {
                            crop: 'fill',
                            gravity: 'auto',
                            quality: 'auto',
                            fetch_format: 'auto'
                        }
                    ]
                })
            )
        );

        const imageUrls = imageUploads.map(img => img.secure_url);

        const hero = new Superhero({
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
            images: imageUrls,
        });

        const savedHero = await hero.save();

        res.status(201).json({
            message: "Hero created successfully",
            hero: savedHero,
        });
    } catch (error) {
        console.error("Error saving hero:", error);
        res.status(500).json({ message: "Failed to create hero", error });
    }
}

export const getHeroById = async (req, res) => {
    try {
        const hero = await Superhero.findById(req.params.id);
        if (!hero) {
            return res.status(404).json({ message: "Hero not found" });
        }
        res.json(hero);
    } catch (error) {
        console.error("Error updating hero:", error);
        res.status(500).json({ message: "Failed to find hero", error: error });
    }
}

export const updateHeroById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body || {};

        const existingHero = await Superhero.findById(req.params.id);
        if (!existingHero) {
            return res.status(404).json({ message: "Hero not found" });
        }

        const uploadedImages = req.files || [];
        const uploadedUrls = await Promise.all(
            uploadedImages.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: 'testtask', transformation: [
                        {
                            crop: 'fill',
                            gravity: 'auto',
                            quality: 'auto',
                            fetch_format: 'auto'
                        }
                    ]
                })
            )
        ).then(results => results.map(img => img.secure_url));

        const combinedImages = [...(existingHero.images || []), ...uploadedUrls];

        const updatePayload = {
            ...(nickname && { nickname }),
            ...(real_name && { real_name }),
            ...(origin_description && { origin_description }),
            ...(superpowers && { superpowers }),
            ...(catch_phrase && { catch_phrase }),
            ...(combinedImages.length > 0 && { images: combinedImages }),
        };

        const updatedHero = await Superhero.findByIdAndUpdate(
            req.params.id,
            { $set: updatePayload },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Hero updated", hero: updatedHero });
    } catch (error) {
        console.error("Error updating hero:", error);
        res.status(500).json({ message: "Failed to update hero", error: error });
    }
};

export const deleteHeroById = async (req, res) => {
    try {
        const deletedHero = await Superhero.findByIdAndDelete(req.params.id);
        if (!deletedHero) {
            return res.status(404).json({ message: "Hero not found" });
        }

        const images = deletedHero.images

        await Promise.all(images.map(image => cloudinary.uploader.destroy(decodeURIComponent(getEncodedPublicId(image)))))

        res.status(200).json({ message: "Hero deleted", hero: deletedHero });
    } catch (error) {
        console.error("Error updating hero:", error);
        res.status(500).json({ message: "Failed to delete hero", error: error });
    }
}

export const deleteHeroImage = async (req, res) => {
    try {
        const { heroId, imageUrl } = req.body;

        const hero = await Superhero.findById(heroId);
        if (!hero) return res.status(404).json({ message: 'Hero not found' });

        hero.images = hero.images.filter(img => img !== imageUrl);
        await hero.save();

        const publicId = decodeURIComponent(getEncodedPublicId(imageUrl));
        await cloudinary.uploader.destroy(publicId);

        res.status(200).json({ message: 'Image deleted successfully', images: hero.images });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Failed to delete image', error });
    }
};