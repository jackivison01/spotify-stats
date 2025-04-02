import { TIME_RANGES } from "../../constants/profile";
import { Track } from "../../types/track";
interface TrackContainerProps {
  tracks: Track[];
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
}

export default function TrackContainer({ tracks, timeRange, setTimeRange }: TrackContainerProps) {
  return tracks.length > 0 ? (
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
        {tracks.map((track) => (
          <li key={track.id} style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <img src={track.album.images[0]?.url} alt={track.name} style={{ width: 50, borderRadius: "50%" }} />
            <p>{track.name}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>Loading top tracks...</p>
  );
}
