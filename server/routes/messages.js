
const router = require('express').Router();
const Room = require('../models/Room');
const Message = require('../models/Message');
const User = require('../models/User');

// CREATE
router.post('/send/:roomId/:userId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        const user = await User.findById(req.params.userId);

        if (!user)
            return res.status(404).json('User not found');
        if (!room)
            return res.status(404).json('Room not found');

        
        if (room.members.includes(user._id)) {
            const newMessage = new Message(req.body);
            newMessage.room = room;
            newMessage.sender = user;
            const message = await newMessage.save();
            return res.status(200).json(message);
        }
        else{
            return res.status(403).json('User not in room');
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// GET all messages in room
router.get('/all/:roomId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        if (!room)
            return res.status(404).json('Room not found');
        const messages = await Message.find({room: room._id});
        return res.status(200).json(messages);
    } catch (err) {
        return res.status(500).json(err);
    }
});
        

module.exports = router;
