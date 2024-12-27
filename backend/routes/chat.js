const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Fetch Messages
router.get('/:sender/:receiver', async (req, res) => {
    const { sender, receiver } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        }).sort('timestamp');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
