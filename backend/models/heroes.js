import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: [true, 'Nickname is required'],
        minlength: [2, 'Nickname must be at least 2 characters'],
        trim: true,
    },
    real_name: {
        type: String,
        required: [true, 'Real name is required'],
        minlength: [2, 'Real name must be at least 2 characters'],
        trim: true,
    },
    origin_description: {
        type: String,
        required: [true, 'Origin description is required'],
        minlength: [10, 'Description must be at least 10 characters'],
    },
    superpowers: {
        type: String,
        required: [true, 'Superpowers are required'],
        minlength: [3, 'Superpowers must be at least 3 characters'],
    },
    catch_phrase: {
        type: String,
        required: [true, 'Catch phrase is required'],
        minlength: [3, 'Catch phrase must be at least 3 characters'],
    },
    images: {
        type: [String],
        required: [true, 'At least one image URL is required'],
        validate: {
            validator: function (arr) {
                return arr.every(url => /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(url));
            },
            message: 'All images must be valid URLs ending in .jpg, .jpeg, .png, or .webp',
        },
    },
});

const Superhero = mongoose.model("Superhero", superheroSchema);

export default Superhero;