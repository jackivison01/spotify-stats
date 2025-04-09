import { Track } from "../../types/track";

interface RecentlyPlayedProps {
  recentlyPlayed: Track[];
}

export default function RecentlyPlayed({ recentlyPlayed }: RecentlyPlayedProps) {
  return (
    <div style={{ padding: "1rem", flexDirection: "row" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Recently Played</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "flex-start"
        }}
      >
        {recentlyPlayed.map((track) => (
          <div
            key={track.id}
            style={{
              width: 100,
              textAlign: "center"
            }}
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px"
              }}
            />
            <p
              style={{
                fontSize: "0.75rem",
                marginTop: "0.5rem",
                wordWrap: "break-word"
              }}
            >
              {track.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
