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
  import {Link } from "react-router-dom";
  import { roomSelected } from "../../apiCalls";

  import Blog from "../../components/dashboard/Blog";
  import bg1 from "../../assets/images/bg/bg1.jpg";
  import bg2 from "../../assets/images/bg/bg2.jpg";
  import bg3 from "../../assets/images/bg/bg3.jpg";
  import bg4 from "../../assets/images/bg/bg4.jpg";
  import {useContext, useState, useEffect} from 'react';
  import {AuthContext} from '../../context/AuthContext';
import Chat from "./chat/Chat";
  
  const Rooms = () => {

    const [rooms,setRooms] = useState([]);
    const { isFetching, error, dispatch} = useContext(AuthContext);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    useEffect(() =>{
      user.rooms.map( async (room) => {
        const res = await axios.get("/rooms/get/" + room);
        setRooms(prev => [...prev, res.data]);
      });
      }, []
    );


    console.log(rooms);
    return (
      <div>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
          
        <h4 className="mb-3">Personal Rooms</h4>
        {rooms.length !== 0 ?
          <Row>
{          rooms.map((room, index) => (
            room.visibility === "private" ?
            <Col sm="6" lg="6" xl="3" key={index}>
              <Blog
                image={room.image}
                title={room.name}
                subtitle={room.members.length + " members"}
                text={room.desc.substring(0,100) + "..."}
                button={<Button color={"secondary"} ><Link style={{"textDecoration":"None","color":"white"}} to={"/chat"} onClick={()=>{roomSelected(room._id,dispatch);localStorage.setItem("room",JSON.stringify(room._id))}}>Open</Link></Button>}
              >
              </Blog>
            </Col>
            : <></>
          ))}
          </Row>
          : <Row><h4 className="mb-3 ml-5 m-2">No private rooms Found</h4></Row>}
        
    </div>
  )};

export default Rooms;