import { PlayIcon, PauseIcon, UserCircle } from "lucide-react";

function MusicCard({ index, src, songTitle, artistName, isPlaying, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`h-24 flex justify-between w-full items-center rounded-md p-6 border transition-all duration-300 cursor-pointer ${
        isPlaying
          ? "bg-gray-700/50 border-green-500 shadow-lg shadow-green-500/10"
          : "bg-gray-800 border-white/10 hover:bg-gray-700"
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`w-4 text-sm ${isPlaying ? "text-green-500 font-bold" : "text-gray-400"}`}
        >
          {index}.
        </span>

        <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-md bg-gray-900">
          <img
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? "scale-110 blur-[1px]" : "scale-100"
            }`}
            src={src}
            alt={songTitle}
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 px-2">
              <div className="w-1.5 h-3 bg-green-500 animate-bounce"></div>
              <div className="w-1.5 h-5 bg-green-500 animate-[bounce_1.2s_infinite]"></div>
              <div className="w-1.5 h-4 bg-green-500 animate-[bounce_0.8s_infinite]"></div>
              <div className="w-1.5 h-6 bg-green-500 animate-[bounce_1.1s_infinite]"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span
            className={`text-lg font-semibold ${isPlaying ? "text-green-500" : "text-white"}`}
          >
            {songTitle}
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <UserCircle size={14} />
            <span>{artistName}</span>
          </div>
        </div>
      </div>

      <button
        className={`p-3 rounded-full transition-all ${
          isPlaying
            ? "bg-green-500 text-black scale-110"
            : "bg-white text-black"
        }`}
      >
        {isPlaying ? (
          <PauseIcon size={20} fill="black" />
        ) : (
          <PlayIcon size={20} fill="black" />
        )}
      </button>
    </div>
  );
}

export default MusicCard;
