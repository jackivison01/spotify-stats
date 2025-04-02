import React, { useEffect, useState } from "react";
import { getSpotifyProfile, getTopArtists, getTopTracks } from "../services/api";
import { SpotifyProfile } from "../types/profile";
import { Artist } from "../types/artist";
import { Track } from "../types/track";
import ArtistContainer from "../components/profile/ArtistContainer";
import { TIME_RANGE_DEFAULT, MAX_DISPLAY } from "../constants/profile";
import TrackContainer from "../components/profile/TrackContainer";

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<SpotifyProfile | null>(null);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [artistTimeRange, setArtistTimeRange] = useState<string>(TIME_RANGE_DEFAULT);
  const [trackTimeRange, setTrackTimeRange] = useState<string>(TIME_RANGE_DEFAULT);

  const checkDataInLocalStorage = () => {
    const storedUserProfile = localStorage.getItem("user_profile");
    const storedTopArtists = localStorage.getItem("top_artists");
    const storedTopTracks = localStorage.getItem("top_tracks");
    if (storedUserProfile) {
      setUserProfile(JSON.parse(storedUserProfile));
    }
    if (storedTopArtists) {
      setTopArtists(JSON.parse(storedTopArtists));
    }
    if (storedTopTracks) {
      setTopTracks(JSON.parse(storedTopTracks));
    }
    if (storedUserProfile || storedTopArtists || storedTopTracks) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (checkDataInLocalStorage()) {
      console.log("Data loaded from cache.")
      return;
    }
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem("spotify_access_token");
        if (!access_token) {
          console.error("Access token not found. Please log in.");
          return;
        }
        const user_data = await getSpotifyProfile(access_token);
        const top_artists = await getTopArtists(access_token, MAX_DISPLAY, artistTimeRange);
        const top_tracks = await getTopTracks(access_token, MAX_DISPLAY, trackTimeRange);

        if (user_data) {
          setUserProfile(user_data);
          localStorage.setItem("user_profile", JSON.stringify(user_data));
        }
        if (top_artists) {
          setTopArtists(top_artists);
          localStorage.setItem("top_artists", JSON.stringify(top_artists));
        }
        if (top_tracks) {
          setTopTracks(top_tracks);
          localStorage.setItem("top_tracks", JSON.stringify(top_tracks));
        }
        console.log(top_artists);
        console.log(user_data);
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
        {userProfile ? (
          <>
            <h1>{userProfile.display_name}</h1>
            <img src={userProfile.images[0]?.url} alt="Profile" style={{ width: 150, borderRadius: "50%" }} />
            <p>Followers: {userProfile.followers.total}</p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "30px" }}>
          <div style={{ flex: 1 }}>
            <h2>Top Artists</h2>
            <ArtistContainer artists={topArtists} timeRange={artistTimeRange} setTimeRange={setArtistTimeRange} />
          </div>
          <div style={{ flex: 1 }}>
            <h2>Top Tracks</h2>
            <TrackContainer tracks={topTracks} timeRange={trackTimeRange} setTimeRange={setTrackTimeRange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
