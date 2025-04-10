import { getCurrentlyPlaying, getRecentlyPlayed } from "../services/api";
import { useEffect, useState } from "react";
import { Track } from "../types/track";
import RecentlyPlayed from "../components/recently-played/RecentlyPlayed";
import CurrentlyPlayingContainer from "../components/recently-played/CurrentlyPlayingContainer";

export default function RecentlyPlayedPage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null); //current track object
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]); //array of recently played tracks
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
          setCurrentTrack(data);
          //console.log(data.item);
        } else {
          console.log("No currently playing track.");
        }
      } catch (error) {
        console.log("Error fetching currently playing data:", error);
      } finally {
        setLoading(false); // Stop loading after API call completes
      }
    };

    const fetchRecentlyPlayed = async () => {
      const access_token = localStorage.getItem("spotify_access_token");
      if (!access_token) {
        console.error("Access token not found. Please log in.");
        return;
      }
      try {
        const data = await getRecentlyPlayed(access_token, 5);
        if (data) {
          setRecentlyPlayed(data);
        }
      } catch (error) {
        console.log("Error fetching recently played data:", error);
      }
    };

    fetchCurrentlyPlaying();
    fetchRecentlyPlayed();
    // Set interval to fetch currently playing track every 15 seconds
    const interval = setInterval(() => {
      fetchCurrentlyPlaying();
      fetchRecentlyPlayed();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Currently Playing</h1>
      <CurrentlyPlayingContainer loading={loading} currentTrack={currentTrack} />
      <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
    </>
  );
}
