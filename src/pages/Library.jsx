import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import MusicCard from "../components/MusicCard";
import PlayerBar from "../components/PlayerBar";
import Sidebar from "../components/Sidebar";

function Library() {
  const [isOpen, setIsOpen] = useState(false);
  const [musicData, setMusicData] = useState([
    {
      songTitle: "Blinding Lights",
      artistName: "The Weeknd"
    },
    { songTitle: "Assurance", artistName: "Davido" },
    { songTitle: "Last Last", artistName: "Burna Boy" },
    { songTitle: "Find me", artistName: "Shallipopi" },
    { songTitle: "Wildflower", artistName: "Billie Eilish" },
    { songTitle: "Mockingbird", artistName: "Eminem" },
    { songTitle: "True", artistName: "Yoari" },
    { songTitle: "Jogodo", artistName: "Wizkid" },
    { songTitle: "Love", artistName: "Burna Boy" },
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
  }, [musicData]);

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

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full relative min-h-screen bg-black text-white flex flex-col select-none pb-32">
      <Sidebar isOpen={isOpen} />
      <main className="y-10 md:ml-64">
        <Header sidebarAction={handleSidebarToggle} />
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setCurrentlyPlaying(null)}
          className="hidden"
        />

        <div className="px-10 flex flex-col items-center gap-5 max-w-4xl mx-auto w-full">
          {musicData.map((music, i) => (
            <MusicCard
              key={i}
              index={i + 1}
              {...music}
              isPlaying={currentlyPlaying === music.songTitle}
              onToggle={() =>
                handleTogglePlay(music.songTitle, music.artistName)
              }
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
      </main>
    </div>
  );
}

export default Library;
