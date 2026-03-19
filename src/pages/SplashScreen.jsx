import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl tracking-tighter flex flex-col items-center gap-5">
        <div className="w-30 h-30 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-15 h-15 bg-black rounded-md rotate-45" />
        </div>
        <span className="hidden md:block">VibeStream</span>
      </h1>
    </div>
  );
}

export default SplashScreen;