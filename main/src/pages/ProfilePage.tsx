import React, { useEffect, useState } from "react";
import { getSpotifyProfile } from "../services/api";
import { SpotifyProfile } from "../types/spotify";

const ProfilePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<SpotifyProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem("spotify_access_token");
        if (!access_token) {
            console.error("Access token not found. Please log in.");
            return;
        }
        const user_data = await getSpotifyProfile(access_token);

        if (user_data) {
            setUserProfile(user_data);
        }
        console.log(user_data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  return (
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
  );
};

export default ProfilePage;
