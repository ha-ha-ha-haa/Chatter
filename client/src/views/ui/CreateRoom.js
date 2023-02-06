import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forms = () => {

  const history = useNavigate();
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
  
  const saveNewUser = async () => {
    console.log(user._id);
    try {
      const res = await axios.get("/users/" + user._id);
      console.log(res.data);
      setuser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
    history("/rooms");

  };
  const createroom = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/rooms/create/"+user._id, {
        name: e.target.Name.value,
        desc: e.target.description.value,
        image: e.target.ImageURL.value,
        visibility: e.target.visibility.value,
      });
    } catch (error) {
      console.log(error);
    }
    saveNewUser();

  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Create Room
          </CardTitle>
          <CardBody>
            <Form onSubmit={createroom}>
              <FormGroup>
                <Label for="Name">Room Name</Label>
                <Input
                  id="Name"
                  name="Name"
                  placeholder="Room Name ..."
                  type="text"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input id="description" name="text" type="textarea" required placeholder="Description ..." />
              </FormGroup>
              <FormGroup>
                <Label for="ImageURL">Image URL</Label>
                <Input
                  id="ImageURL"
                  name="ImageURL"
                  placeholder="Image URL ..."
                  type="text"
                  required
                />
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Visibility</legend>
                <FormGroup check>
                  <Input id="private" name="visibility" type="radio" value="private" />{" "}
                  <Label check>
                    Private
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Input id="public" name="visibility" type="radio" value="public" checked="checked"/>{" "}
                  <Label check>
                    Public
                  </Label>
                </FormGroup>
              </FormGroup>
              <Button type="submit">Create</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
