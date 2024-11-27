import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleViewEmployees = (departmentId) => {
    navigate(`/employees-per-department/${departmentId}`);
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center">Departments</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department) => (
                  <tr key={department.id}>
                    <td>{department.name}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleViewEmployees(department.id)}
                      >
                        View Employees
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Departments;
