import express from 'express';
import upload from '../middleware/multer.js';
import { body } from 'express-validator';
import { createHero, deleteHeroById, deleteHeroImage, getAllHeroes, getHeroById, updateHeroById } from '../controllers/heroesController.js';

const router = express.Router();

router.get("/", getAllHeroes);

router.post('/',
    upload.array('images', 5),
    [
        body('nickname').trim().isLength({ min: 2 }).withMessage('Nickname must be at least 2 characters'),
        body('real_name').trim().isLength({ min: 2 }).withMessage('Real name must be at least 2 characters'),
        body('origin_description').isLength({ min: 10 }).withMessage('Origin description must be at least 10 characters'),
        body('superpowers').isLength({ min: 3 }).withMessage('Superpowers must be at least 3 characters'),
        body('catch_phrase').isLength({ min: 3 }).withMessage('Catch phrase must be at least 3 characters'),
    ],
    createHero);

router.delete('/image', deleteHeroImage)

router.route('/:id')
    .get(getHeroById)
    .patch(upload.array('images', 5),
        [
            body('nickname').optional().isLength({ min: 2 }).withMessage('Nickname must be at least 2 characters'),
            body('real_name').optional().isLength({ min: 2 }).withMessage('Real name must be at least 2 characters'),
            body('origin_description').optional().isLength({ min: 10 }).withMessage('Origin description must be at least 10 characters'),
            body('superpowers').optional().isLength({ min: 3 }).withMessage('Superpowers must be at least 3 characters'),
            body('catch_phrase').optional().isLength({ min: 3 }).withMessage('Catch phrase must be at least 3 characters'),
        ],
        updateHeroById)
    .delete(deleteHeroById);

export default router;