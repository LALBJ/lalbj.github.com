import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import { Single } from "./pages/single/Single";
import Write from "./pages/write/Write";
import "./App.css";

function App() {
  const currentUser = false;
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact element={<Home />} path="/"></Route>
        <Route element={<Home />} path="/posts"></Route>
        <Route
          path="/register"
          element={currentUser ? <Home /> : <Register />}
        ></Route>
        <Route
          path="/login"
          element={currentUser ? <Home /> : <Login />}
        ></Route>
        <Route path="/post/:id" element={<Single />}></Route>
        <Route
          path="/write"
          element={currentUser ? <Home /> : <Write />}
        ></Route>
        <Route
          path="/settings"
          element={currentUser ? <Home /> : <Settings />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
