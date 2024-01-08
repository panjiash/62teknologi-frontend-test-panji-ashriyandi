import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddBusiness from "./pages/AddBusiness";
import Testing from "./pages/Testing";
import EditBusiness from "./pages/EditBusiness";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/add`} element={<AddBusiness />} />
        <Route path={`/edit/:id`} element={<EditBusiness />} />
        <Route path={`/testing`} element={<Testing />} />
      </Routes>
    </Router>
  );
}

export default App;
