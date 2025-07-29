import React, { useEffect, useState } from "react";
import { getSpotifyProfile, getTopArtists, getTopTracks, deriveTopAlbumsFromTracks, getAlbumDetails } from "../services/api";
import { SpotifyProfile } from "../types/profile";
import { Artist } from "../types/artist";
import { Track } from "../types/track";
import ArtistContainer from "../components/profile/ArtistContainer";
import { TIME_RANGE_DEFAULT, MAX_DISPLAY, CACHE_EXPIRY_TIME, TIME_RANGES } from "../constants/profile";
import TrackContainer from "../components/profile/TrackContainer";
import { Album } from "../types/album";
import AlbumContainer from "../components/profile/AlbumContainer";

const ProfilePage: React.FC = () => {
  const [data, setData] = useState<{
    userProfile: SpotifyProfile | null;
    topArtists: Artist[];
    topTracks: Track[];
    topAlbums: Album[];
  }>({
    userProfile: null,
    topArtists: [],
    topTracks: [],
    topAlbums: [],
  });

  const [timeRange, setTimeRange] = useState<string>(TIME_RANGE_DEFAULT);
  /** State for individual time ranges for artists, tracks, and albums */
  const [artistTimeRange, setArtistTimeRange] = useState<string>(TIME_RANGE_DEFAULT);
  const [trackTimeRange, setTrackTimeRange] = useState<string>(TIME_RANGE_DEFAULT);
  const [albumTimeRange, setAlbumTimeRange] = useState<string>(TIME_RANGE_DEFAULT);

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
    const cachedTopAlbums = getCachedData(`top_albums_${albumTimeRange}`);

    if (cachedUserProfile && cachedTopArtists && cachedTopTracks && cachedTopAlbums) {
      setData({ userProfile: cachedUserProfile, topArtists: cachedTopArtists, topTracks: cachedTopTracks, topAlbums: cachedTopAlbums });
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

        const top_50_tracks = await getTopTracks(access_token, 50, albumTimeRange);
        const top_albums_ids: { albumId: string; count: number }[] = deriveTopAlbumsFromTracks(top_50_tracks || []);
        const albumPromises = top_albums_ids.map((album) =>
          getAlbumDetails(access_token, album.albumId)
        );

        const allAlbums = await Promise.all(albumPromises);

        // Filter out nulls
        const top_albums: Album[] = allAlbums.filter((album): album is Album => album !== null).slice(0, MAX_DISPLAY);

        setData({ userProfile: user_data, topArtists: top_artists, topTracks: top_tracks, topAlbums: top_albums });

        localStorage.setItem("user_profile", JSON.stringify({ data: user_data, timestamp: Date.now() }));
        localStorage.setItem(`top_artists_${artistTimeRange}`, JSON.stringify({ data: top_artists, timestamp: Date.now() }));
        localStorage.setItem(`top_tracks_${trackTimeRange}`, JSON.stringify({ data: top_tracks, timestamp: Date.now() }));
        localStorage.setItem(`top_albums_${albumTimeRange}`, JSON.stringify({ data: top_albums, timestamp: Date.now() }));
        console.log("Data fetched and cached successfully.");

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [timeRange, artistTimeRange, trackTimeRange, albumTimeRange]);

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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
          <h3>Set Time Range For All Sections</h3>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => {
              setTimeRange(e.target.value);
              setArtistTimeRange(e.target.value);
              setTrackTimeRange(e.target.value);
              setAlbumTimeRange(e.target.value);
            }}
            style={{ padding: "8px", fontSize: "16px", borderRadius: "4px", minWidth: "200px" }}
          >
            {TIME_RANGES.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "30px" }}>
          <div style={{ flex: 1 }}>
            <h2>Top Artists</h2>
            <ArtistContainer artists={data.topArtists} timeRange={artistTimeRange} setTimeRange={setArtistTimeRange} />
          </div>
          <div style={{ flex: 1 }}>
            <h2>Top Tracks</h2>
            <TrackContainer tracks={data.topTracks} timeRange={trackTimeRange} setTimeRange={setTrackTimeRange} />
          </div>
          <div style={{ flex: 1 }}>
            <h2>Top Albums</h2>
            <AlbumContainer albums={data.topAlbums} timeRange={albumTimeRange} setTimeRange={setAlbumTimeRange} />
          </div>
        </div>
        <div>
          <p style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
            Note: Data is cached for {CACHE_EXPIRY_TIME / (1000 * 60)} minutes to reduce API calls.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
