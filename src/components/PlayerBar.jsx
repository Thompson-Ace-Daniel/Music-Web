import {
  Volume2,
  Maximize2,
  Repeat,
  Shuffle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

function PlayerBar({
  currentSong,
  isPlaying,
  progress,
  currentTime,
  volume,
  handleSeek,
  handleVolumeChange,
  onToggle,
}) {
  const progressStyle = {
    background: `linear-gradient(to right, #22c55e ${progress}%, #3f3f46 ${progress}%)`,
  };

  const volumeStyle = {
    background: `linear-gradient(to right, #ffffff ${volume * 100}%, #3f3f46 ${volume * 100}%)`,
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-white/5 px-6 py-3 z-50">
      <div className="absolute top-0 left-0 right-0 -translate-y-1/2 group">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          style={progressStyle}
          className="w-full h-1 appearance-none cursor-pointer transition-all hover:h-1.5 rounded-full"
        />
      </div>

      <div className="flex items-center justify-between max-w-7xl mx-auto w-full h-16">
        <div className="flex items-center gap-4 w-1/3">
          {currentSong && (
            <img
              src={currentSong.src}
              className="w-12 h-12 rounded shadow-md object-cover animate-in fade-in zoom-in duration-300"
              alt="Art"
            />
          )}
          <div className="flex flex-col overflow-hidden text-left">
            <span className="text-sm font-bold truncate text-white">
              {currentSong?.songTitle || "Not Playing"}
            </span>
            <span className="text-xs text-gray-400 truncate">
              {currentSong?.artistName || "Select a song"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-6">
            <Shuffle
              size={18}
              className="text-gray-400 hover:text-green-500 cursor-pointer transition-colors"
            />
            <SkipBack
              size={20}
              className="text-gray-200 hover:text-white cursor-pointer"
            />

            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-lg"
              onClick={onToggle}
            >
              {isPlaying ? (
                <Pause size={20} fill="black" />
              ) : (
                <Play size={20} fill="black" className="ml-1" />
              )}
            </button>

            <SkipForward
              size={20}
              className="text-gray-200 hover:text-white cursor-pointer"
            />
            <Repeat
              size={18}
              className="text-gray-400 hover:text-green-500 cursor-pointer transition-colors"
            />
          </div>
          <div className="text-[10px] text-gray-500 font-mono">
            0:{Math.floor(currentTime).toString().padStart(2, "0")} / 0:30
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-1/3">
          <Volume2 size={18} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={volumeStyle}
            className="w-24 h-1 appearance-none bg-gray-600 rounded-lg cursor-pointer accent-white"
          />
          <Maximize2
            size={18}
            className="text-gray-400 hover:text-white cursor-pointer ml-2"
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerBar;
