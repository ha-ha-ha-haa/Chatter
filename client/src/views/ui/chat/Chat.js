import "./chat.css";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";

const Chat = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [roomSelected, setRoomSelected] = useState(JSON.parse(localStorage.getItem("room")));
  const [room , setRoom] = useState();
  const [fakeUsers, setfakeUser] = useState(["taha", "dansishkutta", "chupp krr bsdk"]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const scrollRef = useRef();

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  const getUsers = async () => {
    const res = await axios.get("/rooms/users/"+roomSelected);
    setUsers(res.data);
  };

  const getRoom = async () => {
    const res = await axios.get("/rooms/get/"+roomSelected);
    setRoom(res.data);
  };
  useEffect(() => {
    getUsers();
    getRoom();
    socket.current = io("ws://localhost:8900");
    socket.current.emit("join_room", roomSelected);
    socket.current.on("receive_message", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        room: data.room,
        content: data.text,
        createdAt: Date.now(),
      });
    });
    console.log(arrivalMessage);
    
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage.content]);
    console.log(messages);
  }, [arrivalMessage]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get("/message/all/" + roomSelected);

      res.data.map((message) => {
        setMessages((prev) => [...prev, message.content]);
      });
    };
    getMessages();
  }, []);


  const saveMessage = async () => {
    try {
      const res = axios.post("/message/send/" + roomSelected + "/" + user._id, {
        content: newMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    socket.current.emit("send_message", {
      senderId: user._id,
      room: roomSelected,
      text: newMessage,
    });
    setMessages((prev) => [...prev, newMessage]);
    saveMessage();
    setNewMessage("");
    
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const removeUser = async (id) => {
    try {
      console.log(id);
      const res = await axios.put("/rooms/leave/" + roomSelected + "/" + id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };



  console.log(user._id);
  console.log(room);

  return (
    <main >
      <div className="taha" style={{ display: "flex", gap: "3rem"}}>
        <div className="col-xs-8 col-sm-9 col-md-7 col-lg-7 col-xl-7 chat">
          <ul className="list-unstyled text-white">
            {messages.map((message) => (
              <li className="d-flex justify-content-between mb-2" ref={scrollRef}>
                <img
                  src={user.profilePicture ? user.profilePicture : "https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg"}
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                ></img>
                <div className="card mask-custom" style={{ width: "100%" }}>
                  <div
                    className="card-header d-flex justify-content-between p-3"
                    style={{
                      "border-bottom": "1px solid rgba(255,255,255,.3)",
                    }}
                  >
                    <p className="text-dark fw-bold mb-0">{user.username}</p>
                    <p className="text-dark small mb-0">
                      <i className="far fa-clock"></i> 12 mins ago
                    </p>
                  </div>
                  <div className="card-body">
                    <p style={{}} className="text-dark mb-0">
                      {message}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            <li className="mb-3 " style={{ position: "sticky", bottom: "0" }}>
              <div
                className="form-outline form-white "
                style={{ "text-align": "center","position":"relative","bottom":"0" }}
              >
                <textarea
                  type="text"
                  id="form4Example3"
                  className="form-control"
                  style={{ "height": "50px","resize": "none","overflow":"hidden","border":"none","boxShadow":"none","user-select": "none" }}
                  onChange={handleChange}
                  value={newMessage}
                  onKeyDown={handleKeyDown}
                ></textarea>
                <button
                  type="button"
                  className="btn btn-lg btn-rounded float-end fixed-bottom"
                  style={{ position: "relative", bottom: "3.1rem",left:"3rem","width":"50px","height":"50px","background-color":"white",border:"none" }}
                  onClick={sendMessage}
                >
                  <i class="bi bi-send"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div className="members" style={{ width: "25%","position": "fixed","right":"2rem" }} >


          <div
            className="card mask-custom "
            
          >
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li>              <h5 className="font-weight-bold mb-3 text-center text-dark">
            Members
          </h5></li>
                {users.map((use) => (
                  <li
                    className="p-1 border-bottom"
                    style={{
                      "border-bottom":
                        "1px solid rgba(255,255,255,.3) !important",
                    }}
                  >
                    <p
                      href="#!"
                      className="d-flex justify-content-between link-dark"
                      style={{ textDecoration: "None" }}
                    >
                      <div className="d-flex flex-row">
                        <img
                          src={use.profilePicture ? use.profilePicture : "https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg"}
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="30"
                        ></img>
                        <div className="pt-1">
                          <p classNameName="text-dark">{use.username}</p>
                        </div>
                        {(room.Admin === use._id) ? 
                        <div className="pt-1"style={{"position":"relative","right":"0"}}>
                        <Badge color="success" className="ms-3" pill>
                          Admin
                        </Badge>
                        </div>

                       : room.Admin === user._id ?
                        <div className="pt-1"style={{"position":"relative","right":"0"}}>
                          <button onClick={()=>{console.log("hello_world");removeUser(use._id)}}>
                        <Badge color="danger" className="ms-3" pill>
                          remove
                        </Badge>
                        </button>
                        </div>
                       :<></>
                      
                      } 
                      </div>
                    </p>
                    
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chat;
