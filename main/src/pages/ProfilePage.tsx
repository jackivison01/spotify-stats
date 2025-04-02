import React, { useEffect, useState } from "react";
import { getSpotifyProfile, getTopArtists } from "../services/api";
import { SpotifyProfile } from "../types/profile";
import { Artist } from "../types/artist";
import ArtistContainer from "../components/profile/ArtistContainer";
import { TIME_RANGE_DEFAULT, TIME_RANGES } from "../constants/profile";

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<SpotifyProfile | null>(null);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState<string>(TIME_RANGE_DEFAULT);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem("spotify_access_token");
        if (!access_token) {
          console.error("Access token not found. Please log in.");
          return;
        }
        const user_data = await getSpotifyProfile(access_token);
        const top_artists = await getTopArtists(access_token, 3, timeRange);

        if (user_data) {
          setUserProfile(user_data);
        }
        if (top_artists) {
          setTopArtists(top_artists);
        }
        console.log(top_artists);
        console.log(user_data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [timeRange]);

  return (
    <>
      <div>
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
        <h2>Top Artists</h2>
        <ArtistContainer artists={topArtists} timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>
    </>
  );
};

export default ProfilePage;
