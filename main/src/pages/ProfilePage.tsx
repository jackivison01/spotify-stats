import React, { useEffect, useState } from "react";
import { getSpotifyProfile } from "../services/api";

const ProfilePage: React.FC = () => {
  const [displayName, setDisplayName] = useState<string>("");

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
          setDisplayName(user_data.display_name);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  return <h1>{displayName || "Loading..."}</h1>;
};

export default ProfilePage;
