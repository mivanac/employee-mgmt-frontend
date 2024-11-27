import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import NoMatch from "./pages/noMatch/NoMatch";
import PostEmployee from "./pages/employee/PostEmployee";
import Employees from "./pages/employee/Employees";
import PostDepartment from "./pages/department/PostDepartment";
import Departments from "./pages/department/Departments";
import UpdateEmployee from "./pages/employee/UpdateEmployee";
import EmployeesPerDepartment from "./pages/employee/EmployeesPerDepartment";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-department" element={<PostDepartment />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/add-employee" element={<PostEmployee />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employee/:id" element={<UpdateEmployee />} />
        <Route
          path="/employees-per-department/:id"
          element={<EmployeesPerDepartment />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
