import React, { useState } from "react";
import "./styles.css";
import ArtistCarousel from "../ArtistCarousel";
import Footer from "../Footer";
import AudioVisualizer from "./components/AudioVisualizer";

function App() {
  const [albums] = useState([
    { title: "Shape of You", album: "Divide" },
    { title: "Blinding Lights", album: "After Hours" },
    { title: "Levitating", album: "Future Nostalgia" },
    { title: "Peaches", album: "Justice" },
  ]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Filter albums/songs by title or album name
  const filteredAlbums = albums.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.album.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
        <input
          type="text"
          placeholder="Search albums or titles..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            padding: "8px 32px 8px 8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        <button
          onClick={() => setSearch(searchInput)}
          style={{
            marginLeft: "-28px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#888",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Search"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37-1.41 1.42-4.38-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        </button>
      </div>
      {/* Artist Carousel Section */}
      <ArtistCarousel />

      {/* Audio Visualizer Section */}
      <AudioVisualizer />

      {/* Features Drawer */}
      {/* Render filtered albums/songs */}
      <div>
        {filteredAlbums.map((item, idx) => (
          <div key={idx}>
            {/* Render your album/song info here */}
            <div>
              {item.title} - {item.album}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
