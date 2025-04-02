import axios from 'axios';
import { SpotifyProfile } from '../types/spotify';
import { Track } from '../types/track';
import { Artist } from '../types/album';

export async function getSpotifyProfile(accessToken: string): Promise<SpotifyProfile | null> {
    try {
        const response = await axios.get<SpotifyProfile>('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching Spotify profile:', error);
        return null;
    }
}

export async function getTopArtists(accessToken: string): Promise<Artist[] | null> {
    console.log(accessToken);
    return null;
}

export async function getTopTracks(accessToken: string): Promise<Track[] | null> {
    console.log(accessToken);
    return null;
}
