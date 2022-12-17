import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Header";
import Login from "./components/Auth/login";
import Home from "./components/Home";
import PrivateComponent from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
