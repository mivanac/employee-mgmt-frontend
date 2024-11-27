import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EmployeesPerDepartment = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmloyees = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/management/employeesByDepartment/${id}`
        );

        const data = await response.json();

        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees: ", error.message);
      }
    };

    fetchEmloyees();
  }, [id]);

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/management/employee/${employeeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeId)
        );
      }

      console.log(`Employee with ID ${employeeId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting employee: ", error.message);
    }
  };

  const handleUpdate = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center">Employees</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Salary</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.departmentName}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleUpdate(employee.id)}
                      >
                        Update
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
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

export default EmployeesPerDepartment;
