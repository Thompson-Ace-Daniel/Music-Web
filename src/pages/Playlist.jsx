import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MusicCard from "../components/MusicCard";
import PlayerBar from "../components/PlayerBar";

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
    { songTitle: "True", artistName: "Yoari", src: "/logo.png" },
    { songTitle: "Jogodo", artistName: "Wizkid", src: "/logo.png" },
    { songTitle: "Love", artistName: "Burna Boy", src: "/logo.png" }
  ]);

  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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
      audio.paused ? audio.play() : audio.pause();
      if (audio.paused) setCurrentlyPlaying(null);
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
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(audio.currentTime);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const currentSong = musicData.find((s) => s.songTitle === currentlyPlaying);

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

      <PlayerBar
        currentSong={currentSong}
        isPlaying={!!currentlyPlaying}
        progress={progress}
        currentTime={currentTime}
        volume={volume}
        handleSeek={handleSeek}
        handleVolumeChange={(e) => {
          setVolume(e.target.value);
          audioRef.current.volume = e.target.value;
        }}
        onToggle={() =>
          currentlyPlaying &&
          handleTogglePlay(currentlyPlaying, currentSong?.artistName)
        }
      />

      <Footer />
    </div>
  );
}

export default Playlist;
