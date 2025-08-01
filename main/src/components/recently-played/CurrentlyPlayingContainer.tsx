import { Track } from "../../types/track";
interface CurrentlyPlayingProps {
  loading: boolean; // Loading state
  currentTrack: Track | null; // Current track object
}

export default function CurrentlyPlayingContainer({ loading, currentTrack }: CurrentlyPlayingProps) {
  return (
    <>
      {loading ? ( // Check the loading state
        <p>Loading currently playing...</p>
      ) : (currentTrack) ? (
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
    </>
  )
}