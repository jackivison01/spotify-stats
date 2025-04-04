import { getCurrentlyPlaying } from "../services/api";
import { useEffect, useState } from "react";
import { CurrentlyPlaying } from "../types/currently_playing";
import { Track } from "../types/album";

export default function RecentlyPlayedPage() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying | null>(null); //object for currently playing
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null); //current track object
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      const access_token = localStorage.getItem("spotify_access_token");
      if (!access_token) {
        console.error("Access token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentlyPlaying(access_token);
        if (data) {
          setCurrentlyPlaying(data);
          setCurrentTrack(data.item);
          console.log(data.item);
        } else {
          console.log("No currently playing track.");
        }
      } catch (error) {
        console.log("Error fetching currently playing data:", error);
      } finally {
        setLoading(false); // Stop loading after API call completes
      }
    };

    fetchCurrentlyPlaying();
    // Set interval to fetch currently playing track every 15 seconds
    const interval = setInterval(fetchCurrentlyPlaying, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Currently Playing</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
        {loading ? ( // Check the loading state
          <p>Loading currently playing...</p>
        ) : (currentlyPlaying && currentTrack) ? (
          <div style={{ textAlign: "center" }}>
            <img
              src={currentTrack.album.images[0]?.url}
              alt="Album Cover"
              style={{ width: 150 }}
            />
            <h2 style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
              {currentTrack.name} - {currentTrack.artists.map((artist) => artist.name).join(", ")}
            </h2>
          </div>
        ) : (
          <p>No track is currently playing.</p> // Message when no track is playing
        )}
      </div>
    </div>
  );
}
