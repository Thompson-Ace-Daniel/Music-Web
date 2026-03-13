import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MusicCard from "../components/MusicCard";
import { Volume2, Maximize2, Repeat, Shuffle } from "lucide-react";

function Playlist() {
  const [musicData, setMusicData] = useState([
    {
      songTitle: "Blinding Lights",
      artistName: "The Weeknd",
      src: "/logo.png",
    },
    { songTitle: "Assurance", artistName: "Davido", src: "/logo.png" },
    { songTitle: "Last Last", artistName: "Burna Boy", src: "/logo.png" },
    { songTitle: "Find me", artistName: "Shallipopi", src: "/logo.png" },
    { songTitle: "Wildflower", artistName: "Billie Eilish", src: "/logo.png" },
    { songTitle: "Mockingbird", artistName: "Eminem", src: "/logo.png" },
    { songTitle: "True", artistName: "Yaori", src: "/logo.png" },
    { songTitle: "Jogodo", artistName: "Wizkid", src: "/logo.png" },
  ]);

  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAllArtwork = async () => {
      const updatedData = await Promise.all(
        musicData.map(async (song) => {
          try {
            const query = encodeURIComponent(
              `${song.songTitle} ${song.artistName}`,
            );
            const res = await fetch(
              `https://itunes.apple.com/search?term=${query}&limit=1&entity=song`,
            );
            const data = await res.json();
            if (data.results?.[0]) {
              const highResArt = data.results[0].artworkUrl100.replace(
                "100x100",
                "600x600",
              );
              return { ...song, src: highResArt };
            }
          } catch (e) {
            console.error(e);
          }
          return song;
        }),
      );
      setMusicData(updatedData);
    };
    fetchAllArtwork();
  }, []);

  const handleTogglePlay = async (songTitle, artistName) => {
    const audio = audioRef.current;
    if (currentlyPlaying === songTitle) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      const query = encodeURIComponent(`${songTitle} ${artistName}`);
      const response = await fetch(
        `https://itunes.apple.com/search?term=${query}&limit=1&entity=song`,
      );
      const data = await response.json();
      const streamUrl = data.results[0]?.previewUrl;
      if (streamUrl) {
        audio.src = streamUrl;
        audio.play();
        setCurrentlyPlaying(songTitle);
      }
    }
  };

  const handleTimeUpdate = () => {
    const value =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(value || 0);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const val = e.target.value;
    setVolume(val);
    audioRef.current.volume = val;
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col select-none pb-32">
      <Header />
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setCurrentlyPlaying(null)}
        className="hidden"
      />

      <div className="p-10 flex flex-col items-center gap-5 max-w-4xl mx-auto w-full">
        {musicData.map((music, i) => (
          <MusicCard
            key={i}
            index={i + 1}
            {...music}
            isPlaying={currentlyPlaying === music.songTitle}
            onToggle={() => handleTogglePlay(music.songTitle, music.artistName)}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-lg border-t border-white/10 p-4 px-6 flex flex-col gap-2">
        {/* Progress Slider */}
        <div className="flex items-center gap-3 w-full max-w-5xl mx-auto">
          <span className="text-xs text-gray-400">
            0:
            {Math.floor(audioRef.current?.currentTime || 0)
              .toString()
              .padStart(2, "0")}
          </span>
          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 accent-green-500 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-400">0:30</span>
        </div>

        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          {/* Currently Playing Info */}
          <div className="flex items-center gap-4 w-1/3">
            <div className="text-sm font-semibold truncate">
              {currentlyPlaying || "Select a song"}
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-6">
            <Shuffle
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
            <div
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black cursor-pointer"
              onClick={() =>
                currentlyPlaying && handleTogglePlay(currentlyPlaying)
              }
            >
              {currentlyPlaying ? "⏸" : "▶"}
            </div>
            <Repeat
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-4 w-1/3">
            <Volume2 size={18} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 accent-white bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <Maximize2
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Playlist;
