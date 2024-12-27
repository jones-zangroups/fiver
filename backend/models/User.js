// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },  // Add googleId field
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },  // This will be optional for OAuth users
    isSeller: { type: Boolean, default: false },
    picture: { type: String },
});

// Hash password before saving (only if password is provided)
UserSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
