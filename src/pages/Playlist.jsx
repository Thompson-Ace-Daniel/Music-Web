import { useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MusicCard from "../components/MusicCard";

function Playlist() {
  const [musicData] = useState([
    { songTitle: "Blinding Lights", artistName: "Wknd", src: "/logo.png" },
    { songTitle: "Assurance", artistName: "Davido", src: "/logo.png" },
    { songTitle: "Love", artistName: "Burna Boy", src: "/logo.png" },
    { songTitle: "Find me", artistName: "Shalipopi", src: "/logo.png" },
    { songTitle: "Wildflower", artistName: "Billie Eilish", src: "/logo.png" },
    { songTitle: "Mocking Bird", artistName: "Eminem", src: "/logo.png" },
  ]);

  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const audioRef = useRef(null);

  const handleTogglePlay = async (songTitle, artistName) => {
    const audio = audioRef.current;

    if (currentlyPlaying === songTitle) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      try {
        const query = encodeURIComponent(`${songTitle} ${artistName}`);
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=bd1fe628&format=json&limit=1&namesearch=${query}`,
        );
        const data = await response.json();

        const track = data.results[0];

        if (track && track.audio) {
          audio.src = track.audio;
          audio.play();
          setCurrentlyPlaying(songTitle);
        } else {
          alert("Song not found on Jamendo!");
        }
      } catch (error) {
        console.error("Error fetching from Jamendo:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col select-none">
      <Header />

      <audio
        ref={audioRef}
        onEnded={() => setCurrentlyPlaying(null)}
        className="hidden"
      />

      <div className="p-10 flex flex-col justify-center items-center gap-5">
        {musicData.map((music, i) => (
          <MusicCard
            key={music.songTitle}
            index={i + 1}
            src={music.src}
            artistName={music.artistName}
            songTitle={music.songTitle}
            isPlaying={currentlyPlaying === music.songTitle}
            onToggle={() => handleTogglePlay(music.songTitle, music.artistName)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Playlist;
