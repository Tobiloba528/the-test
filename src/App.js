import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import UsersTable from "./components/UsersTable";
import UserForm from "./components/UserForm";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <h1 style={{ padding: "10px 0 0 40px", marginBottom: "20px" }}>
        Dashboard
      </h1>
      <Routes>
        <Route path="/form" element={<UserForm />} />
        <Route path="/" element={<UsersTable />} />
      </Routes>
    </>
  );
}

export default App;
