import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MusicCard from "../components/MusicCard";

function Playlist() {
  const [musicData] = useState([
    {
      songTitle: "Blinding Lights",
      artistName: "Wknd",
      src: "/logo.png",
    },
    {
      songTitle: "Assurance",
      artistName: "Davido",
      src: "/logo.png",
    },
    {
      songTitle: "Love",
      artistName: "Burna Boy",
      src: "/logo.png",
    },
    {
      songTitle: "Find me",
      artistName: "Shalipopi",
      src: "/logo.png",
    },
    {
      songTitle: "Wildflower",
      artistName: "Billie Eilish",
      src: "/logo.png",
    },
    {
      songTitle: "Mocking Bird",
      artistName: "Eminem",
      src: "/logo.png",
    },
  ]);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col select-none">
      <Header />
      <div className="p-10 flex flex-col justify-center items-center gap-5">
        {musicData.map((music, i) => {
          return (
            <MusicCard
              index={i+1}
              src={music.src}
              artistName={music.artistName}
              songTitle={music.songTitle}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Playlist;
