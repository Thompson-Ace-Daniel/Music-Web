import { Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Library from "./pages/Library";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route index element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/library" element={<Library />} />
    </Routes>
  );
}

export default App;
