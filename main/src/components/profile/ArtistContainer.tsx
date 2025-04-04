import { Artist } from "../../types/artist";
import { TIME_RANGES } from "../../constants/profile";

interface ArtistContainerProps {
  artists: Artist[];
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
}

export default function ArtistContainer({ artists, timeRange, setTimeRange }: ArtistContainerProps) {
  return artists.length > 0 ? (
    <div>
      <label htmlFor="timeRange">Select Time Range: </label>
      <select
        id="timeRange"
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
      >
        {TIME_RANGES.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {artists.map((artist) => (
          <li key={artist.id} style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <img src={artist.images[0]?.url} alt={artist.name} style={{ width: 50 }} />
            <p>{artist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>Loading top artists...</p>
  );
}
