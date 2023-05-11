import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import AddUser from "./Pages/AddUser/AddUser";
import EditUser from "./Pages/EditUser/EditUser";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Components/Menu/Menu";

function App() {
  return (
    <div>
      <div>
        <Menu />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
