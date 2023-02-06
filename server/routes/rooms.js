const router = require('express').Router();
const Room = require('../models/Room');
const User = require('../models/User');

//CREATE
router.post('/create/:userId', async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);
        // add admin to room if user exists
        if (user) {
            let newRoom = new Room(req.body);
            newRoom.members.push(user);
            newRoom.Admin = user;
            user.rooms.push(newRoom);
            const room = await newRoom.save();
            await user.save();
            return res.status(200).json(room);
        }
        else{
            return res.status(403).json('User does not exist');
        }
    } catch (err) {
        return res.status(500).json("Room already exists");
    }
});
// join room
router.put('/join/:roomId/:userId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        const user = await User.findById(req.params.userId);

        if (!user)
            return res.status(404).json('User not found');
        if (!room)
            return res.status(404).json('Room not found');
        
        if (room.members.includes(user._id))
            return res.status(403).json('User already in room');

        room.members.push(user);
        user.rooms.push(room);
        const updatedRoom = await room.save();
        await user.save();
        return res.status(200).json(updatedRoom);

    } catch (err) {
        return res.status(500).json(err);
    }
});
// leave room
router.put('/leave/:roomId/:userId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        const user = await User.findById(req.params.userId);


        if (!user)
            return res.status(404).json('User not found');
        if (!room)
            return res.status(404).json('Room not found');
        
        if (room.Admin._id.equals(user._id)){
            return res.status(403).json('Admin cannot leave room');
        }

        room.members.splice(room.members.indexOf(user._id), 1);
        user.rooms.splice(user.rooms.indexOf(room._id), 1);

        if (room.members.length === 0) {
            await Room.findByIdAndDelete(req.params.roomId);
            return res.status(200).json('Room deleted');
        }
        const updatedRoom = await room.save();
        await user.save();
        return res.status(200).json(updatedRoom);
    
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get room 
router.get('/get/:roomId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        return res.status(200).json(room);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get all public rooms 
router.get('/public', async (req, res) => {
    try {
        const rooms = await Room.find({visibility: 'public'});
        return res.status(200).json(rooms);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get all users in room
router.get('/users/:roomId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        
        // return all user objects instead of ids
        let users = [];
        for (let i = 0; i < room.members.length; i++) {
            const user = await User.findById(room.members[i]);
            users.push(user);
        }
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});
module.exports = router;