import { Track } from "../../types/track"

interface RecentlyPlayedProps {
  recentlyPlayed: Track[];
}

export default function RecentlyPlayed({ recentlyPlayed }: RecentlyPlayedProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', height: '100vh' }}>
      <h1>Recently Played</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {recentlyPlayed.map((track) => (
            <li key={track.id} style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <img src={track.album.images[0]?.url} alt={track.name} style={{ width: 50 }} />
              <p>{track.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}