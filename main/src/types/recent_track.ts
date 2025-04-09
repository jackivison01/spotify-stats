import { Track } from "./track";

export type RecentTrack = {
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  played_at: string;
  track: Track;
}