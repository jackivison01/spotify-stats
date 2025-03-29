// src/types/spotify.ts

export type ExplicitContent = {
    filter_enabled: boolean;
    filter_locked: boolean;
};

export type ExternalUrls = {
    spotify: string;
};

export type Followers = {
    href: string | null;
    total: number;
};

export type Image = {
    url: string;
    height: number;
    width: number;
};

export type Artist = {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: 'artist';
    uri: string;
};

export type SpotifyProfile = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
};
