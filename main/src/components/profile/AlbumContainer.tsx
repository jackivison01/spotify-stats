import { TIME_RANGES } from "../../constants/profile";
import { Album } from "../../types/album";

interface AlbumContainerProps {
  albums: Album[];
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
}

export default function AlbumContainer({ albums, timeRange, setTimeRange }: AlbumContainerProps) {
  return albums.length > 0 ? (
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
        {albums.map((album) => (
          <li key={album.id} style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <img src={album.images[0]?.url} alt={album.name} style={{ width: 50 }} />
            <p>{album.name}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>Loading top albums...</p>
  );
}
