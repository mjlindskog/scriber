const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScriberSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: "Author name required"
    },

    title: {
        type: String,
        trim: true,
        required: "Please give your entry a title"
    },

    body: {
        type: String,
        trim: true,
        required: "What's on your mind?",
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    subject: {
        type: String,
        trim: true
    }
});

const Scriber = mongoose.model("Scriber", ScriberSchema);

module.exports = Scriber;