import { useState } from "react";
import { PlayIcon, PauseIcon, UserCircle } from "lucide-react";

function MusicCard({ index, src, songTitle, artistName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  };

  return (
    <div title={songTitle} onClick={handlePlay} className="h-10 flex justify-between w-full items-center bg-gray-800 rounded-md p-10 border border-white font-semibold cursor-pointer hover:bg-gray-600">
      <span>{index}.</span>
      <img
        className="rounded-md w-10 h-10"
        src={src}
        alt="Music Banner"
      />
      <div className="flex flex-col w-40">
        <span>{songTitle}</span>
        <div className="flex gap-2">
            <UserCircle color="#dddddd" />
          <span>{artistName}</span>
        </div>
      </div>
      <div>
        <button
          title={isPlaying ? "Pause" : "Play"}
          className="cursor-pointer"
          onClick={handlePlay}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
}

export default MusicCard;
