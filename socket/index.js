const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000",
        // methods: ["GET", "POST"]
        }
});

// io.on('connection', socket => {
//     // socket.emit('your id', socket.id);
//     // socket.on('send message', body => {
//     //     io.emit('message', body)
//     // })
//     console.log('user connected');
//     io.to('welcome', 'welcome to server')
// })  

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);


    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`user ${socket.id} joined room ${data}`);
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    })

});


// let users = [];

// const adduser = (userId, socketId) => {
//     !users.some(user => user.userId === userId) &&
//     users.push({userId, socketId});
// }

// const removeuser = (socketId) => {
//     users = users.filter(user => user.socketId !== socketId);
// }

// const getuser = (userId) => {
//     return users.find(user => user.userId === userId);
// }

// io.on('connection', socket => {
//     console.log('user connected');

//     socket.on('adduser', (userId) => {
//         adduser(userId, socket.id);
//         io.emit('getusers', users);
//     });

// socket.on('sendmessage', ({userId, receiverId, text}) => {
//     const user = getuser(receiverId);
//     io.to(user.socketId).emit('getmessage', {
//         senderId: userId,
//         text,
//     });
// });

    

// socket.on('disconnect', () => {
//     console.log('user disconnected');
//     removeuser(socket.id);
//     io.emit('getusers', users)
// });



    // socket.on('new-user-joined', name => {
    //     users[socket.id] = name;
    //     socket.broadcast.emit('user-joined', name);
    // });

    // socket.on('send', message => {
    //     socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    // });

    // socket.on('disconnect', message => {
    //     socket.broadcast.emit('left', users[socket.id]);
    //     delete users[socket.id];
    // });
// });