import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { roomSelected } from "../../apiCalls";

import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Chat from "./chat/Chat";

const PublicRooms = () => {
  const [rooms, setRooms] = useState([]);
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const getPublicRooms = async () => {
      const res = await axios.get("/rooms/public");
      setRooms(res.data);
    };
    getPublicRooms();
  }, []);

  const joinRoom = async (room) => {
    const res = await axios.put("/rooms/join/" + room._id +"/"+ user._id);
    const res_user = await axios.get("/users/" + user._id);
    console.log(res_user.data);
    setUser(res_user.data);
    localStorage.setItem("user", JSON.stringify(res_user.data));
  };


  console.log(rooms);
  console.log(user);
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}

      <h4 className="mb-3">Communities</h4>
      {rooms.length !== 0 ? (
        <Row>
          
          {rooms.map((room, index) =>
            room.visibility === "public" ? (
              <Col sm="6" lg="6" xl="3" key={index}>
                <Blog
                  image={room.image}
                  title={room.name}
                  subtitle={room.members.length + " members"}
                  text={room.desc.substring(0, 100) + "..."}
                  button={
                    <Button color={"secondary"}>
                      <i class="fa fa-external-link" aria-hidden="true"></i>
                      <Link
                        style={{ textDecoration: "None", color: "white"}}
                        to={"/chat"}
                        onClick={() => {
                          if (!(user.rooms.includes(room._id)))
                          {
                            joinRoom(room);
                          }

                          roomSelected(room._id, dispatch);
                          localStorage.setItem(
                            "room",
                            JSON.stringify(room._id)
                          );
                        }}
                      >
                          {user.rooms.includes(room._id) ? "  Open" : "  Join"}
                      </Link>
                    </Button>
                  }
                ></Blog>
              </Col>
            ) : (
              <></>
            )
          )}
        </Row>
      ) : (
        <Row>
          <h4 className="mb-3 ml-5 m-2">No Communities Found</h4>
        </Row>
      )}
    </div>
  );
};

export default PublicRooms;
