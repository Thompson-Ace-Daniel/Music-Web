import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Music } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    console.log("Login data:", email, password);

    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          <h1 className="text-2xl font-bold">VibeStream App</h1>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Login to your account
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/20 text-red-400 p-2 text-sm rounded">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer text-gray-400"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 select-none cursor-pointer p-3 rounded font-semibold transition"
            onClick={() => navigate("/playlist")}
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-green-500 cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
