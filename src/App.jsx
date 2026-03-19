import { Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Playlist from "./pages/Playlist";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route index element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/playlist" element={<Playlist />} />
    </Routes>
  );
}

export default App;
