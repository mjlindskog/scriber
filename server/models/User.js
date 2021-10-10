const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { EntrySchema } = require('./Entry');
const crypto = require('crypto');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        savedEntrys: [EntrySchema],
        favoriteEntrys: [EntrySchema],
        visitedEntrys: [EntrySchema],
        hash: {
            type: String,
            //unique: true
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);


userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    //console.log(this)


    let hashString = {
        username: this.username,
        email: this.email,
        random: process.env.SECRET
    }
    hashString = JSON.stringify(hashString);
    this.hash = crypto.createHash('sha256', process.env.SECRET).update(hashString).digest('hex');

    next();
});


userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


userSchema.virtual('entryCount').get(function () {
    return this.savedEntrys.length;
});

const User = model('User', userSchema);

module.exports = User;