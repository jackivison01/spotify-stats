import { Artist } from "../../types/artist";

interface ArtistContainerProps {
  artists: Artist[];
}

export default function ArtistContainer({ artists }: ArtistContainerProps) {
  return artists.length > 0 ? (
    <ul>
      {artists.map((artist) => (
        <li key={artist.id}>
          <img src={artist.images[0]?.url} alt={artist.name} style={{ width: 50, borderRadius: "50%" }} />
          {artist.name}
        </li>
      ))}
    </ul>
  ) : (
    <p>Loading top artists...</p>
  );
}
