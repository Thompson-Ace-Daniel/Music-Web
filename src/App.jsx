import { Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <Routes>
      <Route index element={<SplashScreen />} />
      <Route path="/playlist" element={<Playlist />} />
    </Routes>
  );
}

export default App;
