import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/playlist");
    }, 5000);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-1">
      <img className="w-fit" src="/logo_t.png" alt="Music App's Logo" />
      <p className="font-bold text-lg">Welcome to My Music App</p>
    </div>
  );
}

export default SplashScreen;