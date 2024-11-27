import { useState } from "react";
import "./PostDepartment.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const PostDepartment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: 0,
    departmentId: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch(
        "http://localhost:8080/api/management/add-department",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Department created: ", data);
      navigate("/departments");
    } catch (error) {
      console.error("Error creating department: ", error.message);
    }
  };

  return (
    <>
      <div className="center-form">
        <h1>Post New Department</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter department name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Post Department
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PostDepartment;
