const mongoose = require("mongoose");
const crypto = require('crypto');

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
    },
    hash: {
        type: String,
        //unique: true
    },
    public: {
        type: Boolean,
        default: true
    }
});

EntrySchema.pre('save', async function (next) {
    if (this.isNew) {
        let hashString = {
            authors: this.authors,
            title: this.title,
            body: this.body,
            subject: this.subject,
            random: process.env.SECRET
        }
        hashString = JSON.stringify(hashString);
        this.hash = crypto.createHash('sha256', process.env.SECRET).update(hashString).digest('hex');
    }
    next();
});

const Entry = mongoose.model("Entry", EntrySchema);

module.exports = {
    Entry,
    EntrySchema
}