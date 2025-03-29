import axios from 'axios';
import { SpotifyProfile } from '../types/spotify';

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
