import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    const result = await axios.get("http://localhost/reactcurd/details.php");
    setUser(result.data);
  };

  const deleteUser = (id) => {
    axios.get("http://localhost/reactcurd/delete.php?id="+id).then((res) => {
      toast.success("user deleted sucessfully");
    });
    loadUsers();
  };
  const sorting = (sort) => {
    setSort(sort);
  };
  const searchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      <div>
        <h1 className="py-3 text-center">User Details</h1>
      </div>

      <div>
        <Container>
          <Row>
            <Col sm={10}>
              <InputGroup
                className="mb-3"
                value={search}
                onChange={searchInput}
              >
                <InputGroup.Text id="basic-addon3">Search</InputGroup.Text>
                <Form.Control id="basic-url" aria-describedby="basic-addon3" />
              </InputGroup>
            </Col>
            <Col sm={2}>
              <Dropdown className="text-end table ">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sort By
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => sorting("name")}>
                    Name
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => sorting("id")}>
                    ID
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => sorting("email")}>
                    Email
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => sorting("none")}>
                    None
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </div>

      <Table striped bordered hover className="table border shadow">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>PhoneNumber</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user
            .sort((a, b) => {
              return a[sort] > b[sort] ? 1 : -1;
            })
            .filter((val, i) => {
              if (search != "" && sort == "name") {
                return val.name.toLowerCase().includes(search.toLowerCase());
              }

              if (search != "" && sort == "email") {
                return val.email.toLowerCase().includes(search.toLowerCase());
              }
              if (search != "" && sort == "id") {
                console.log("id");
                return val.id.toString().includes(search);
              }
              return (
                val.name.toLowerCase().includes(search.toLowerCase()) ||
                val.email.toLowerCase().includes(search.toLowerCase()) ||
                val.id.toString().includes(search)
              );
            })
            .map((items) => {
              return (
                <tr>
                  <td>{items.id}</td>
                  <td>{items.name}</td>
                  <td>{items.phoneNumber}</td>
                  <td>{items.email}</td>
                  <td>{items.password}</td>
                  <td>
                    <Link className="mr-2" to={`/edit/${items.id}`}>
                      <i class="fa fa-edit" aria-hidden="true"></i>
                    </Link>
                    <Link className="mr-2" onClick={() => deleteUser(items.id)}>
                      {" "}
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Home;
