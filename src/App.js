import { Routes, Route } from "react-router-dom";
import UsersTable from "./components/UsersTable";
import UserForm from "./components/UserForm";

function App() {
  return (
    <>
      <h1 style={{ padding: "10px 0 0 40px", marginBottom: '40px' }}>Dashboard</h1>
      <Routes>
        <Route path="/form" element={<UserForm />} />
        <Route path="/" element={<UsersTable />} />
      </Routes>
    </>
  );
}

export default App;
