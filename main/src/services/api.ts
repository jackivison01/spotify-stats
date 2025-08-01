import axios from 'axios';
import { SpotifyProfile } from '../types/profile';
import { Track } from '../types/track';
import { Artist } from '../types/artist';
import { RecentTrack } from '../types/recent_track';
import { ErrorResponse } from '../types/error';
import { Album } from '../types/album';

function isErrorResponse(error: unknown): error is ErrorResponse {
    return typeof error === 'object' && error !== null && 'response' in error;
}

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

export async function getTopArtists(accessToken: string, total: number, time_range: string): Promise<Artist[] | null> {
    try {
        const response = await axios.get<{ items: Artist[] }>(
            `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=${total}&offset=0`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.items;
    }
    catch (error) {
        console.log('Error fetching top artists:', error);
        return null;
    }
}


export async function getTopTracks(accessToken: string, total: number, time_range: string): Promise<Track[] | null> {
    try {
        const response = await axios.get<{ items: Track[] }>(
            `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${total}&offset=0`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.items;
    }
    catch (error) {
        console.log('Error fetching top tracks:', error);
        return null;
    }
}

export async function getCurrentlyPlaying(accessToken: string): Promise<Track | null> {
    try {
        const response = await axios.get<{ item: Track }>(
            'https://api.spotify.com/v1/me/player/currently-playing',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.item;
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            console.error(error.message);
        } else if (error instanceof Error) {
            console.error('Error fetching currently playing track:', error.message);
        } else {
            console.error('Unknown error fetching currently playing track:', error);
        }
        return null;
    }
}

export async function getRecentlyPlayed(accessToken: string, count: number): Promise<Track[] | null> {
    try {
        const response = await axios.get<{ items: RecentTrack[] }>(
            `https://api.spotify.com/v1/me/player/recently-played?limit=${count}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const tracks = response.data.items.map((item) => item.track); // Extracting the track from the RecentTrack object
        return tracks;
    } catch (error) {
        console.error('Error fetching recently played tracks:', error);
        return null;
    }
}

export async function getAlbumDetails(accessToken: string, albumId: string): Promise<Album | null> {
    try {
        const response = await axios.get<Album>(
            `https://api.spotify.com/v1/albums/${albumId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching album details:', error);
        return null;
    }
}

export function deriveTopAlbumsFromTracks(tracks: Track[]): { albumId: string; count: number }[] {
    const albumCountMap: Record<string, number> = {};

    tracks.forEach((track) => {
        const albumId = track.album?.id;
        if (albumId) {
            albumCountMap[albumId] = (albumCountMap[albumId] || 0) + 1;
        }
    });

    return Object.entries(albumCountMap)
        .map(([albumId, count]) => ({ albumId, count }))
        .sort((a, b) => b.count - a.count); // Sort descending by count
}