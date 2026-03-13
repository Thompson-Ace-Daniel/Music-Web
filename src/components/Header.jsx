import { Search, Bell, User, LayoutGrid, Library } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-black/80 backdrop-blur-md border-b border-white/10 px-8 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h1 className="font-bold text-2xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          <span className="hidden md:block">VibeStream</span>
        </h1>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link
            to="/"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <LayoutGrid size={18} /> Home
          </Link>
          <Link to="/playlist" className="text-white flex items-center gap-2">
            <Library size={18} /> Library
          </Link>
        </nav>
      </div>

      <div className="flex-1 max-w-md px-4">
        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search for songs, artists..."
            className="w-full bg-white/10 border border-transparent focus:border-white/20 focus:bg-white/15 outline-none rounded-full py-2 pl-10 pr-4 text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-black"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold">User Name</p>
            <p className="text-[10px] text-green-500 uppercase tracking-wider">
              Premium
            </p>
          </div>
          <button className="w-10 h-10 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border border-white/10 hover:border-white/40 transition-all">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
