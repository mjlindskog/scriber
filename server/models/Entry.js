const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    authors: {
        type: Array,
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
        trim: true,
        default: 'Unknown Subject'
    },
    views: {
        type: Number,
        default: 0
    }
});

const Entry = mongoose.model("Entry", EntrySchema);

module.exports = {
    Entry,
    EntrySchema
}