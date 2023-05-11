import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./EditUser.css";

function EditUser() {
  const { id } = useParams();

  useEffect(() => {
    LoadUsers();
  }, []);

  let history = useNavigate();

  const [editData, setEditData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const LoadUsers = async () => {
    const result = await axios.get(
      `http://localhost/reactcurd/details.php?id=${id}`
    );
    setEditData(result.data[0]);
  };

  const submitUserData = async (e) => {
    
    e.preventDefault();
    if (editData.name == "") {
      toast.error("Name required");
    } else if (
      editData.phoneNumber.length != 10 ||
      !Number(editData.phoneNumber)
    ) {
      toast.error("Incorrect Phonenumber");
    } else if (!editData.email.endsWith("@gmail.com")) {
      toast.error("Incorrect email");
    } else if (editData.password.length<4||editData.password.length>8) {
      toast.error("Password must be in 4 to 8 letters ");
    }else {
      await axios.put(
        "http://localhost/reactcurd/update.php?id="+id,
        editData
      );
      history("/");
    }
  };

  const setInput = (e) => {
    var d = {};
    d[e.target.name] = e.target.value;
    setEditData({ ...editData, ...d });
  };

  return (
    <div className="container-add">
      <Container >
        <Row>
          <Col>
            <Card  >
              <Card.Body>
                <div className="text-center">
                  <h1>Edit User</h1>
                </div>
                <form onSubmit={submitUserData}>
                  <div className="row">
                    <div className="col-sm-6">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label form"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control form"
                        id="exampleFormControlInput1"
                        name="name"
                        placeholder="Enter Your Name"
                        value={editData.name}
                        onChange={setInput}
                      />
                    </div>
                    <div className="col-sm-6 ">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label form"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        class="form-control form"
                        id="exampleFormControlInput1"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                        value={editData.phoneNumber}
                        onChange={setInput}
                      />
                    </div>
                  </div>
                  <div className="row  ">
                    <div className="col-sm-6 ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label form"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control form"
                        id="exampleFormControlInput1"
                        name="email"
                        placeholder="Enter Email Address"
                        value={editData.email}
                        onChange={setInput}
                      />
                    </div>
                    <div class="col-sm-6 ">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label form"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control form"
                        id="exampleFormControlInput1"
                        name="password"
                        placeholder="Enter Password"
                        value={editData.password}
                        onChange={setInput}
                      />
                    </div>
                  </div>

                  <div className="row  ">
                    <div className="col text-center mt-3 mb-3 ">
                      <button type="submit" className="btn btn-primary">
                        Add User
                      </button>
                      <a href="/" className="btn btn-dark ms-2">
                        Back
                      </a>
                    </div>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default EditUser;
