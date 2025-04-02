import React, { useEffect, useState } from "react";
import { getSpotifyProfile, getTopArtists, getTopTracks } from "../services/api";
import { SpotifyProfile } from "../types/profile";
import { Artist } from "../types/artist";
import { Track } from "../types/track";
import ArtistContainer from "../components/profile/ArtistContainer";
import { TIME_RANGE_DEFAULT, MAX_DISPLAY } from "../constants/profile";
import TrackContainer from "../components/profile/TrackContainer";

const CACHE_EXPIRY_TIME = 1000 * 60 * 30; // 30 minutes

const ProfilePage: React.FC = () => {
  const [data, setData] = useState<{
    userProfile: SpotifyProfile | null;
    topArtists: Artist[];
    topTracks: Track[];
  }>({
    userProfile: null,
    topArtists: [],
    topTracks: [],
  });

  const [artistTimeRange, setArtistTimeRange] = useState<string>(TIME_RANGE_DEFAULT);
  const [trackTimeRange, setTrackTimeRange] = useState<string>(TIME_RANGE_DEFAULT);

  /** Helper function to retrieve cached data with expiration check */
  const getCachedData = (key: string) => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { data, timestamp } = JSON.parse(item);
    if (Date.now() - timestamp > CACHE_EXPIRY_TIME) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  };

  useEffect(() => {
    const cachedUserProfile = getCachedData("user_profile");
    const cachedTopArtists = getCachedData(`top_artists_${artistTimeRange}`);
    const cachedTopTracks = getCachedData(`top_tracks_${trackTimeRange}`);

    if (cachedUserProfile && cachedTopArtists && cachedTopTracks) {
      setData({ userProfile: cachedUserProfile, topArtists: cachedTopArtists, topTracks: cachedTopTracks });
      console.log("Loaded from cache.");
      return;
    }

    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem("spotify_access_token");
        if (!access_token) {
          console.error("Access token not found. Please log in.");
          return;
        }

        const [user_data, top_artists, top_tracks] = await Promise.all([
          cachedUserProfile || getSpotifyProfile(access_token),
          cachedTopArtists || getTopArtists(access_token, MAX_DISPLAY, artistTimeRange),
          cachedTopTracks || getTopTracks(access_token, MAX_DISPLAY, trackTimeRange),
        ]);

        setData({ userProfile: user_data, topArtists: top_artists, topTracks: top_tracks });

        localStorage.setItem("user_profile", JSON.stringify({ data: user_data, timestamp: Date.now() }));
        localStorage.setItem(`top_artists_${artistTimeRange}`, JSON.stringify({ data: top_artists, timestamp: Date.now() }));
        localStorage.setItem(`top_tracks_${trackTimeRange}`, JSON.stringify({ data: top_tracks, timestamp: Date.now() }));

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [artistTimeRange, trackTimeRange]);

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>Profile</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
        {data.userProfile ? (
          <>
            <h1>{data.userProfile.display_name}</h1>
            <img src={data.userProfile.images[0]?.url} alt="Profile" style={{ width: 150, borderRadius: "50%" }} />
            <p>Followers: {data.userProfile.followers.total}</p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "30px" }}>
          <div style={{ flex: 1 }}>
            <h2>Top Artists</h2>
            <ArtistContainer artists={data.topArtists} timeRange={artistTimeRange} setTimeRange={setArtistTimeRange} />
          </div>
          <div style={{ flex: 1 }}>
            <h2>Top Tracks</h2>
            <TrackContainer tracks={data.topTracks} timeRange={trackTimeRange} setTimeRange={setTrackTimeRange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
