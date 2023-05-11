import React, { useState } from "react";
import "./AddUser.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [addData, setAddData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const history = useNavigate();
  const submitUserData = async (e) => {
    e.preventDefault();
    const { name, phoneNumber, email, password } = addData;
    var emailValidRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    var phoneNumberRegex = /^(0|91)?[6-9][0-9]{9}$/;
    if (name == "") {
      toast.error("Name required");
    } else if (!phoneNumber.match(phoneNumberRegex)) {
      toast.error("PhoneNumber in invalid");
    } else if (!email.match(emailValidRegex)) {
      toast.error("Email is invalid");
    } else if (password.length < 4 || password.length > 8) {
      toast.error("password should be in 4 to 8 letters ");
    } else {
      await axios.post("http://localhost/reactcurd/add.php", addData);
      toast.success("User Added Sucessfully");
      history("/");
    }
  };

  const setInput = (e) => {
    var d = {};
    d[e.target.name] = e.target.value;
    setAddData({ ...addData, ...d });
  };
  return (
    <div>
      <div className="container-add">
        <Container>
          <Row>
            <Col>
              <Card class="shadow-lg p-3 mb-5 bg-white rounded box">
                <Card.Body>
                  <div className="text-center">
                    <h1>Add User</h1>
                  </div>

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
                        onChange={setInput}
                      />
                    </div>
                  </div>

                  <div className="row  ">
                    <div className="col text-center mt-3 mb-3 ">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submitUserData}
                      >
                        Add User
                      </button>
                      <a href="/" className="btn btn-dark ms-2">
                        Back
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

export default AddUser;
