import { useNavigate } from "react-router-dom";
import { Bell, Home, Library, Settings, User2 } from "lucide-react";
import Footer from "./Footer";

const pages = [
  { name: "Home", icon: <Home size={24} color="#e5e7eb" />, path: "/" },
  {
    name: "Library",
    icon: <Library size={24} color="#e5e7eb" />,
    path: "/library",
  },
  {
    name: "Account",
    icon: <User2 size={24} color="#e5e7eb" />,
    path: "/account",
  },
  {
    name: "Notifications",
    icon: <Bell size={24} color="#e5e7eb" />,
    path: "/notifications",
  },
  {
    name: "Settings",
    icon: <Settings size={24} color="#e5e7eb" />,
    path: "/settings",
  },
];

function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  return (
    <aside
      className={`fixed top-0 p-10 left-0 w-64 flex flex-col gap-7 h-full bg-black border-r border-white/70 z-100 select-none ${
        isOpen
          ? "translate-x-0 transition-transform"
          : "-translate-x-64 transition-transform"
      } md:translate-x-0 transition-transform`}
    >
      <h1 className="font-bold mb-8 text-2xl tracking-tighter flex items-center gap-2">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
        </div>
        <span>Splashify</span>
      </h1>
      {pages.map((btn, i) => {
        return (
          <button
            key={i}
            onClick={() => navigate(btn.path)}
            className="flex justify-start items-center gap-3 w-full rounded-lg px-4 text-lg text-gray-200 py-2 bg-gray-800 cursor-pointer border border-gray-500 hover:shadow-xs shadow-gray-100"
          >
            <span>{btn.icon}</span>
            {btn.name}
          </button>
        );
      })}
      <Footer />
    </aside>
  );
}

export default Sidebar;
