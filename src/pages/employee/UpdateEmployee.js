import "./UpdateEmployee.css";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: 0,
    departmentId: 0,
  });

  const [departments, setDepartments] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/management/employee/${id}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchEmployee();

    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/management/departments"
        );

        const data = await response.json();

        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments: ", error.message);
      }
    };

    fetchDepartments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/management/employee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("Employee updated: ", data);
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee: ", error.message);
    }
  };

  return (
    <>
      <div className="center-form">
        <h1>Edit Employee</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicNumber">
            <Form.Control
              type="number"
              name="salary"
              placeholder="Enter salary"
              value={formData.salary}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSelect">
            <Form.Select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleInputChange}
            >
              <option>Select any department</option>
              {departments.map((department) => (
                <option value={department.id}>{department.name}</option>
              ))}
            </Form.Select>
          </Form.Group>{" "}
          <Button variant="primary" type="submit" className="w-100">
            Edit Employee
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateEmployee;
