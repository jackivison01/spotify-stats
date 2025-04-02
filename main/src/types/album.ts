// album object used for getting albums

export type ExternalUrls = {
    spotify: string;
};

export type Image = {
    url: string;
    height: number;
    width: number;
};

export type Artist = {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
};

export type Track = {
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {
        external_urls: ExternalUrls;
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    restrictions: {
        reason: string;
    };
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
};

export type Copyright = {
    text: string;
    type: string;
};

export type ExternalIds = {
    isrc: string;
    ean: string;
    upc: string;
};

export type Restrictions = {
    reason: string;
};

export type Album = {
    album_type: "compilation" | "album" | "single" | "appears_on"; // Can be extended for other types of albums
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: "day" | "month" | "year";
    restrictions: Restrictions;
    type: "album";
    uri: string;
    artists: Artist[];
    tracks: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: Track[];
    };
    copyrights: Copyright[];
    external_ids: ExternalIds;
    genres: string[];
    label: string;
    popularity: number;
};
