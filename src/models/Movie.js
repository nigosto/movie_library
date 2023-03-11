import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    producer: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.String,
        required: true
    },
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);